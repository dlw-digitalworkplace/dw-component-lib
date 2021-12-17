import { GroupType } from "./GroupType";
import { SearchType } from "./SearchType";

/**
 * Provide some options to extend filter functionality
 */
export interface IPeoplePickerFilterOptions {
	/**
	 * List of ids to ignore when searching.
	 */
	idsToIgnore: string[];
	/**
	 * Indicate which objects to search for (users, groups or both)
	 */
	searchFor: SearchType;
	/**
	 * Define which group types to search for (AAD, M365, SPO)
	 */
	groupTypes?: Array<GroupType>;
}
