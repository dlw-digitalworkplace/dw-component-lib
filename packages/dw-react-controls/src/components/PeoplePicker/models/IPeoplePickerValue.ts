interface IPeoplePickerValueBase {
	/**
	 * Required field to uniquely identify the object
	 */
	id: string;

	/**
	 * Required field containing the display name of the object
	 */
	displayName: string;

	/**
	 * Required field containing the type of object
	 */
	type: "User" | "Group";
}

export interface IUserValue extends IPeoplePickerValueBase {
	type: "User";

	/**
	 * Required field containing a unique UPN
	 */
	userPrincipalName: string;
}

export interface IGroupValue extends IPeoplePickerValueBase {
	type: "Group";
}

export type PeoplePickerValue = IUserValue | IGroupValue;
