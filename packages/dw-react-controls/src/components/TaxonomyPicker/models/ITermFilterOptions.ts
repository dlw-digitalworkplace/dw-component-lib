export interface ITermFilterOptions {
	/**
	 * Optional anchor ID to filter only specific subterms of a term in the termset.
	 */
	anchorId?: string;

	/**
	 * Match with the default label only.
	 */
	defaultLabelOnly: boolean;

	/**
	 * List of keys to ignore when searching.
	 */
	keysToIgnore: string[];

	/**
	 * Maximum number of items to return.
	 */
	maxItems: number;

	/**
	 * Ignore deprecated terms.
	 */
	trimDeprecated: boolean;

	/**
	 * Ignore terms which are unavailable for tagging.
	 */
	trimUnavailable: boolean;
}
