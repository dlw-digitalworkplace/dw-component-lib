import { IUserValue } from "./IPeoplePickerValue";

/**
 * User information which is being retrieved from a PeoplePickerProvider
 */
export interface IUser extends IUserValue {
	/**
	 * Additional information for the group
	 */
	additionalProperties?: {
		[key: string]: any;
	};
}
