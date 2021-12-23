// tslint:disable:no-bitwise

/**
 * Possible object options to search for in the people picker
 */
export enum SearchType {
	/**
	 * Search for users
	 */
	Users = 1 << 0,
	/**
	 * Search for groups
	 */
	Groups = 1 << 1,
	/**
	 * Search for any supported type
	 */
	Any = Users | Groups
}
