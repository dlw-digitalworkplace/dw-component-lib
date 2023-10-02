import { ITaxonomyProvider, ITerm, ITermFilterOptions } from "@dlw-digitalworkplace/dw-react-controls";
import { escapeRegExp } from "@dlw-digitalworkplace/dw-react-utils";
import * as deepmerge from "deepmerge";
import { InvalidOperationError } from "./InvalidOperationError";
import { ProviderNotInitializedError } from "./ProviderNotInitializedError";

/**
 * Provides Taxonomy data using SharePoint's SP.Taxonomy.js library.
 * To use it, make sure to call the `initialize()` method.
 */
export class SharePointTaxonomyProvider implements ITaxonomyProvider {
	public termValidationRegex = /^[^;"<>|\t\n\r]{1,255}$/gi;

	private isInitialized: boolean = false;

	private spContext: SP.ClientContext;

	private termSet?: SP.Taxonomy.TermSet;

	// todo: consider some better (sliding?) caching mechanism
	private cachedTerms?: SP.Taxonomy.Term[];

	private defaultOptions: ITermFilterOptions = {
		defaultLabelOnly: false,
		keysToIgnore: [],
		maxItems: 100,
		trimDeprecated: true,
		trimUnavailable: true
	};

	constructor(siteUrl: string, private termSetIdOrName: string, private lcid: number = 1033) {
		this.spContext = new SP.ClientContext(siteUrl);

		this._termSorter = this._termSorter.bind(this);
	}

	/**
	 * Verifies if the current termset allows term creation.
	 */
	public get allowAddingTerms() {
		if (!this.isInitialized) {
			throw new ProviderNotInitializedError();
		}

		return this.termSet!.get_isOpenForTermCreation();
	}

	/**
	 * Initializes the provider. MUST be executed before using the provider's methods.
	 */
	public async initialize(preCacheItems?: boolean): Promise<void> {
		// create a taxonomy session
		const session = SP.Taxonomy.TaxonomySession.getTaxonomySession(this.spContext);
		const termStore = session.getDefaultSiteCollectionTermStore();

		if (SP.Guid.isValid(this.termSetIdOrName)) {
			// if a guid is passed, load it directly
			this.termSet = termStore.getTermSet(new SP.Guid(this.termSetIdOrName));
			this.spContext.load(this.termSet);

			await this.executeQueryAsync();
		} else {
			// if a name is passed, find it and take the first match
			const termSets = termStore.getTermSetsByName(this.termSetIdOrName, this.lcid);
			this.spContext.load(termSets);

			await this.executeQueryAsync();

			this.termSet = termSets.itemAt(0);
		}

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
		options = deepmerge(this.defaultOptions, options);

		const result: ITerm[] = [];

		// retrieve all terms
		if (!this.cachedTerms) {
			await this.loadAndCacheAllTerms();
		}

		// iterate all terms until maximum number of items is reached
		for (let i = 0; i < this.cachedTerms!.length && result.length < options.maxItems!; i++) {
			const term = this.cachedTerms![i];

			// skip item if in ignore list
			if (options.keysToIgnore && options.keysToIgnore.indexOf(term.get_id().toString()) !== -1) {
				continue;
			}

			// skip deprecated term if requested
			if (options.trimDeprecated && term.get_isDeprecated()) {
				continue;
			}

			// skip unavailable term if requested
			if (options.trimUnavailable && !term.get_isAvailableForTagging()) {
				continue;
			}

			// check if the search string matches any of the term's labels
			const allLabels = term.get_labels().get_data();
			const matcher = typeof search === "string" ? new RegExp(escapeRegExp(search), "i") : search;
			const hasMatchingLabel = !matcher || allLabels.some((it) => it.get_value().match(matcher));

			if (!hasMatchingLabel) {
				// skip term when search string isn't a match
				continue;
			}

			// map term to an ITerm object
			const termOutput = this._spTermToTerm(term);

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
		options = deepmerge(this.defaultOptions, options);

		const result: ITerm[] = [];

		// retrieve all terms
		if (!this.cachedTerms) {
			await this.loadAndCacheAllTerms();
		}

		// filter based on defined options
		let terms = this.cachedTerms;

		// skip deprecated term if requested
		if (options.trimDeprecated) {
			terms = terms?.filter((t) => !t.get_isDeprecated());
		}

		// skip unavailable term if requested
		if (options.trimUnavailable) {
			terms = terms?.filter((t) => t.get_isAvailableForTagging());
		}

		// create a dictionary by term id, containing a tuple with parentid and term
		const termMap = terms!.reduce<{ [key: string]: [string | null, ITerm] }>((prev, it) => {
			const parent = it.get_parent();
			const parentId = parent.get_serverObjectIsNull() ? null : parent.get_id().toString();

			return {
				...prev,
				[it.get_id().toString()]: [parentId, { ...this._spTermToTerm(it), children: [] }]
			};
		}, {});

		Object.keys(termMap).forEach((it) => {
			const [parentId, term] = termMap[it];

			if (!parentId) {
				// if there is no parent, add it to the root level
				result.push(term);
			} else {
				// if there is a parent, add it as child
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

		// load the parent term if needed
		const parentTerm = !!parentId && this.termSet!.getTerm(new SP.Guid(parentId));

		// create the new term
		const newTermId = SP.Guid.newGuid();
		const newTerm = !parentTerm
			? this.termSet!.createTerm(newValue, this.lcid, newTermId)
			: parentTerm.createTerm(newValue, this.lcid, newTermId);

		this.spContext.load(newTerm);
		this.spContext.load(newTerm, "Labels", "Parent", "Parent.Id", "CustomSortOrder");

		await this.executeQueryAsync();

		if (this.cachedTerms) {
			this.cachedTerms.push(newTerm);
			this.cachedTerms = this.cachedTerms.sort(this._termSorter);
		}

		return this._spTermToTerm(newTerm);
	}

	protected executeQueryAsync(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.spContext.executeQueryAsync(resolve, (_, args) => {
				if (process.env.NODE_ENV !== "production") {
					console.error("Error", {
						error: {
							code: args.get_errorCode(),
							details: args.get_errorDetails(),
							traceCorrelationId: args.get_errorTraceCorrelationId(),
							typeName: args.get_errorTypeName(),
							value: args.get_errorValue()
						},
						message: args.get_message(),
						stackTrace: args.get_stackTrace()
					});
				}

				reject(args.get_message());
			});
		});
	}

	protected async loadAndCacheAllTerms(): Promise<void> {
		// retrieve all items from the termset
		const allTerms = this.termSet!.getAllTerms();
		this.spContext.load(allTerms);
		this.spContext.load(allTerms, "Include(Labels, Parent, Parent.Id, CustomSortOrder)");

		await this.executeQueryAsync();

		// save the sorted list of terms
		this.cachedTerms = allTerms.get_data().sort(this._termSorter);
	}

	private _spTermToTerm(input: SP.Taxonomy.Term): ITerm {
		const termLabel = this._getDefaultTermLabel(input) || input.get_name();

		// add the term to the result set
		const termOutput: ITerm = {
			key: input.get_id().toString(),
			name: termLabel,
			path: input.get_pathOfTerm(),
			disabled: !input.get_isAvailableForTagging() || input.get_isDeprecated(),
			additionalProperties: {
				deprecated: input.get_isDeprecated(),
				synonyms: input
					.get_labels()
					.get_data()
					.map((it) => ({
						language: it.get_language(),
						value: it.get_value()
					}))
			}
		};

		return termOutput;
	}

	/**
	 * Returns the default label for the given language.
	 *
	 * @param allLabels - All available labels
	 * @param lcid - The language of the label
	 */
	private _getDefaultLanguageLabel(term: SP.Taxonomy.Term, lcid: number): SP.Taxonomy.Label {
		const allLabels = term.get_labels().get_data();
		const defaultLabel = allLabels.filter((it) => it.get_language() === lcid && it.get_isDefaultForLanguage())[0];

		return defaultLabel;
	}

	/**
	 * Returns the default label for the term.
	 *
	 * @param allLabels - All available labels
	 */
	private _getDefaultTermLabel(term: SP.Taxonomy.Term): string {
		const termLabelByLcid = this._getDefaultLanguageLabel(term, this.lcid);
		const termLabelEN = this._getDefaultLanguageLabel(term, 1033);

		return !!termLabelByLcid ? termLabelByLcid.get_value() : !!termLabelEN ? termLabelEN.get_value() : term.get_name();
	}

	/**
	 * Sorts terms alphabetically, or custom sortorder if specified.
	 *
	 * @param a - the first term
	 * @param b - the second term
	 */
	private _termSorter(a: SP.Taxonomy.Term, b: SP.Taxonomy.Term): number {
		const sortOrderA = parseInt(a.get_customSortOrder(), 10);
		const sortOrderB = parseInt(b.get_customSortOrder(), 10);

		// consider items with custom sortorder
		if (sortOrderA > 0 || sortOrderB > 0) {
			return sortOrderA > 0 && sortOrderB > 0 ? sortOrderA - sortOrderB : sortOrderA > 0 ? -1 : 1;
		}

		const labelA = this._getDefaultTermLabel(a);
		const labelB = this._getDefaultTermLabel(b);

		return labelA === labelB ? 0 : labelA < labelB ? -1 : 1;
	}
}
