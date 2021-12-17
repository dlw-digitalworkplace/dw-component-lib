export interface IUser {
	/**
	 * Required field to uniquely identify the user
	 */
	id: string;

	/**
	 * Required field containing the display name of the user
	 */
	displayName: string;

	/**
	 * Required field containing a unique UPN
	 */
	userPrincipalName: string;
}
