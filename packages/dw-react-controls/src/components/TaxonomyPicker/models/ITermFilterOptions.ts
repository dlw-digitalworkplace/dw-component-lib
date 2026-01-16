export interface ITermFilterOptions {
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
