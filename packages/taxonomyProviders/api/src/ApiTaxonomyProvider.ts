import { ITaxonomyProvider, ITerm, ITermFilterOptions } from "@dlw-digitalworkplace/dw-react-controls";
import { escapeRegExp } from "@dlw-digitalworkplace/dw-react-utils";
import * as deepmerge from "deepmerge";
import { InvalidOperationError } from "./InvalidOperationError";
import { ProviderNotInitializedError } from "./ProviderNotInitializedError";
import { TermInfo, TermLabel } from "./models/TermInfo";
import { TermSetInfo } from "./models/TermSetInfo";

/**
 * Provides Taxonomy data using SharePoint's SP.Taxonomy.js library.
 * To use it, make sure to call the `initialize()` method.
 */
export class ApiTaxonomyProvider implements ITaxonomyProvider {
	public termValidationRegex = /^[^;"<>|\t\n\r]{1,255}$/gi;

	private isInitialized: boolean = false;

	private termSet?: TermSetInfo;

	// todo: consider some better (sliding?) caching mechanism
	private cachedTerms?: TermInfo[];

	constructor(
		private apiTokenProvider: string | (() => string) | (() => PromiseLike<string>),
		private apiBaseUrl: string,
		private termSetIdOrName: string,
		private lcid: number = 1033
	) {
		this._termSorter = this._termSorter.bind(this);
	}

	/**
	 * Verifies if the current termset allows term creation.
	 */
	public get allowAddingTerms() {
		if (!this.isInitialized) {
			throw new ProviderNotInitializedError();
		}

		return this.termSet!.isOpenForTermCreation;
	}

	/**
	 * Initializes the provider. MUST be executed before using the provider's methods.
	 */
	public async initialize(preCacheItems?: boolean): Promise<void> {
		// create a taxonomy session
		this.termSet = await this._getTermSet();

		if (preCacheItems) {
			// load terms into cache to allow for faster resolving
			await this.loadAndCacheAllTerms();
		}

		this.isInitialized = true;
	}

	public async findTerms(search?: string | RegExp, options: Partial<ITermFilterOptions> = {}): Promise<ITerm[]> {
		if (!this.isInitialized) {
			throw new ProviderNotInitializedError();
		}

		// build final options object
		options = deepmerge(
			{
				defaultLabelOnly: false,
				keysToIgnore: [],
				maxItems: 100,
				trimDeprecated: true,
				trimUnavailable: true
			},
			options
		);

		const result: ITerm[] = [];

		// retrieve all terms
		if (!this.cachedTerms) {
			await this.loadAndCacheAllTerms();
		}

		// iterate all terms until maximum number of items is reached
		for (let i = 0; i < this.cachedTerms!.length && result.length < options.maxItems!; i++) {
			const term = this.cachedTerms![i];

			// skip item if in ignore list
			if (options.keysToIgnore && options.keysToIgnore.indexOf(term.termId) !== -1) {
				continue;
			}

			// skip deprecated term if requested
			if (options.trimDeprecated && term.isDeprecated) {
				continue;
			}

			// skip unavailable term if requested
			if (options.trimUnavailable && !term.isAvailableForTagging) {
				continue;
			}

			// check if the search string matches any of the term's labels
			const allLabels = term.labels;
			const defaultLabel = this._getDefaultTermLabel(term);

			const matcher = typeof search === "string" ? new RegExp(escapeRegExp(search), "i") : search;
			const hasMatchingLabel =
				!matcher ||
				(options.defaultLabelOnly ? defaultLabel.match(matcher) : allLabels.some((it) => it.value.match(matcher)));

			if (!hasMatchingLabel) {
				// skip term when search string isn't a match
				continue;
			}

			// map term to an ITerm object
			const termOutput = this._apiTermToTerm(term);

			result.push(termOutput);
		}

		// return the matched results
		return result;
	}

	public async getTermTree(options: Partial<ITermFilterOptions> = {}): Promise<ITerm[]> {
		if (!this.isInitialized) {
			throw new ProviderNotInitializedError();
		}

		// build final options object
		options = deepmerge(
			{
				trimDeprecated: true,
				trimUnavailable: false
			},
			options
		);

		const result: ITerm[] = [];

		// retrieve all terms
		if (!this.cachedTerms) {
			await this.loadAndCacheAllTerms();
		}

		// filter based on defined options
		let terms = this.cachedTerms || [];

		// skip deprecated term if requested
		if (options.trimDeprecated) {
			terms = terms.filter((t) => !t.isDeprecated);
		}

		// skip deprecated term if requested
		if (options.trimUnavailable) {
			terms = terms.filter((t) => t.isAvailableForTagging);
		}

		// create a dictionary by term id, containing a tuple with parentid and term
		const termMap = terms.reduce<{ [key: string]: [string | null, ITerm] }>((prev, it) => {
			const parentId = !!it.parentId ? it.parentId : null;

			return {
				...prev,
				[it.termId.toString()]: [parentId, { ...this._apiTermToTerm(it), children: [] }]
			};
		}, {});

		Object.keys(termMap).forEach((it) => {
			const [parentId, term] = termMap[it];

			if (!parentId) {
				// if there is no parent, add it to the root level
				result.push(term);
			} else if (termMap[parentId]) {
				// if there is a parent, and it's not trimmed, add it as child
				termMap[parentId][1].children!.push(term);
			}
		});

		return result;
	}

	public async createTerm(newValue: string, parentId?: string): Promise<ITerm> {
		if (!this.isInitialized) {
			throw new ProviderNotInitializedError();
		}

		if (!this.allowAddingTerms) {
			throw new InvalidOperationError("The term set does not allow adding terms.");
		}

		const newTerm: TermInfo = await this._createTerm(newValue, parentId);

		if (this.cachedTerms) {
			this.cachedTerms.push(newTerm);
			this.cachedTerms = this.cachedTerms.sort(this._termSorter);
		}

		return this._apiTermToTerm(newTerm);
	}

	protected async loadAndCacheAllTerms(): Promise<void> {
		const allTerms: TermInfo[] = await this._getTerms();

		// save the sorted list of terms
		this.cachedTerms = allTerms.sort(this._termSorter);
	}

	private _apiTermToTerm(input: TermInfo): ITerm {
		const termLabel = this._getDefaultTermLabel(input) || input.name;

		// add the term to the result set
		const termOutput: ITerm = {
			key: input.termId,
			name: termLabel,
			path: input.pathOfTerm,
			disabled: !input.isAvailableForTagging || input.isDeprecated,
			additionalProperties: {
				availableForTagging: input.isAvailableForTagging,
				deprecated: input.isDeprecated,
				synonyms: input.labels.map((it) => ({
					language: it.language,
					value: it.value
				}))
			}
		};

		return termOutput;
	}

	private async _createTerm(newValue: string, parentId?: string): Promise<TermInfo> {
		const requestBody = {
			label: newValue,
			parentId: parentId
		};

		const apiAccessToken = await this._getApiToken();
		const apiResponse = await fetch(`${this.apiBaseUrl}/termsets/${this.termSetIdOrName}/terms?lcid=${this.lcid}`, {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				Authorization: `Bearer ${apiAccessToken}`,
				"Content-Type": "application/json"
			}
		});

		if (!apiResponse.ok) {
			throw new Error(`Failed to retrieve term set with id or name '${this.termSetIdOrName}'.`);
		}

		const apiResult: TermInfo = await apiResponse.json();

		return apiResult;
	}

	private async _getApiToken(): Promise<string> {
		if (typeof this.apiTokenProvider === "string") {
			return this.apiTokenProvider;
		}

		return await this.apiTokenProvider();
	}

	/**
	 * Returns the default label for the given language.
	 *
	 * @param allLabels - All available labels
	 * @param lcid - The language of the label
	 */
	private _getDefaultLanguageLabel(term: TermInfo, lcid: number): TermLabel {
		const allLabels = term.labels;
		const defaultLabel = allLabels.filter((it) => it.language === lcid && it.isDefaultForLanguage)[0];

		return defaultLabel;
	}

	/**
	 * Returns the default label for the term.
	 *
	 * @param allLabels - All available labels
	 */
	private _getDefaultTermLabel(term: TermInfo): string {
		const termLabelByLcid = this._getDefaultLanguageLabel(term, this.lcid);
		const termLabelEN = this._getDefaultLanguageLabel(term, 1033);

		return !!termLabelByLcid ? termLabelByLcid.value : !!termLabelEN ? termLabelEN.value : term.name;
	}

	private async _getTermSet(): Promise<TermSetInfo> {
		const apiAccessToken = await this._getApiToken();
		const apiResponse = await fetch(`${this.apiBaseUrl}/termsets/${this.termSetIdOrName}?lcid=${this.lcid}`, {
			headers: {
				Authorization: `Bearer ${apiAccessToken}`
			}
		});

		if (!apiResponse.ok) {
			throw new Error(`Failed to retrieve term set with id or name '${this.termSetIdOrName}'.`);
		}

		const apiResult: TermSetInfo = await apiResponse.json();

		return apiResult;
	}

	private async _getTerms(): Promise<TermInfo[]> {
		const apiAccessToken = await this._getApiToken();
		const apiResponse = await fetch(`${this.apiBaseUrl}/termsets/${this.termSet!.termSetId}/terms?lcid=${this.lcid}`, {
			headers: {
				Authorization: `Bearer ${apiAccessToken}`
			}
		});

		if (!apiResponse.ok) {
			throw new Error(`Failed to retrieve terms in term set with id or name '${this.termSetIdOrName}'.`);
		}

		const apiResult: TermInfo[] = await apiResponse.json();

		return apiResult;
	}

	/**
	 * Sorts terms alphabetically, or custom sortorder if specified.
	 *
	 * @param a - the first term
	 * @param b - the second term
	 */
	private _termSorter(a: TermInfo, b: TermInfo): number {
		const sortOrderA = a.customSortOrder;
		const sortOrderB = b.customSortOrder;

		// consider items with custom sortorder
		if (sortOrderA > 0 || sortOrderB > 0) {
			return sortOrderA > 0 && sortOrderB > 0 ? sortOrderA - sortOrderB : sortOrderA > 0 ? -1 : 1;
		}

		const labelA = this._getDefaultTermLabel(a);
		const labelB = this._getDefaultTermLabel(b);

		return labelA === labelB ? 0 : labelA < labelB ? -1 : 1;
	}
}
