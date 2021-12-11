import { GroupType } from "./GroupType";

export interface IGroup {
	/**
	 * Required field indicating the type of group
	 */
	groupType: GroupType;

	/**
	 * Required field to uniquely identify a group
	 */
	id: string;

	/**
	 * Required field containing the display name of the group
	 */
  displayName: string;

	/**
	 * Optional field conataining a description for the group
	 */
	description?: any;

	/**
	 * Optional field conataining a mail address for the group
	 */
  mail?: string;

	/**
	 * Optional field indicating if the group is enabled for mail
	 */
  mailEnabled?: boolean;

	/**
	 * Optional field indicating if the group is security enabled
	 */
  securityEnabled?: boolean;

	/**
	 * Optional field conataining the visibility of the group
	 */
  visibility?: string;
}
