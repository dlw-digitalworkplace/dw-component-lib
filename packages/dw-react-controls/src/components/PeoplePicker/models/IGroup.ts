import { GroupType } from "./GroupType";

export interface IGroup {
	/**
	 * Required field to uniquely identify a group
	 */
	id: string;

	/**
	 * Required field containing the display name of the group
	 */
	displayName: string;

	/**
	 * Required field indicating the type of group
	 */
	groupType: GroupType;

	/**
	 * Optional field conataining a description for the group
	 */
	description?: any;
}
