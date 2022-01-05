import { IGroupValue } from "./IPeoplePickerValue";

/**
 * Group information which is being retrieved from a PeoplePickerProvider
 */
export interface IGroup extends IGroupValue {
	/**
	 * Optional field conataining a description for the group
	 */
	description?: any;

	/**
	 * Additional information for the group
	 */
	additionalProperties?: {
		[key: string]: any;
	};
}
