// TODO: Add option to set presence
export interface IUser {
	/**
	 * Required field to uniquely identify the user
	 */

	id: string;

	/**
	 * Required field containing a unique UPN
	 */
	userPrincipalName: string;

	/**
	 * Required field containing the display name of the user
	 */
	displayName: string;

	/**
	 * Optional field containing a list of phone numbers
	 */
	businessPhones?: string[];

	/**
	 * Optional field containing the given name of the user
	 */
	givenName?: string;

	/**
	 * Optional field containing the job title of the user
	 */
	jobTitle?: string;

	/**
	 * Optional field containing an url to the image of the user
	 */
	imageUrl?: string;

	/**
	 * Optional field containing the mail address of the user
	 */
	mail?: string;

	/**
	 * Optional field containing the mobile phone of the user
	 */
	mobilePhone?: string;

	/**
	 * Optional field containing the office location of the user
	 */
	officeLocation?: string;

	/**
	 * Optional field containing the preferred language of the user
	 */
	preferredLanguage?: string;

	/**
	 * Optional field containing the surname of the user
	 */
	surname?: string;
}
