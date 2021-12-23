// tslint:disable:no-bitwise

/**
 * Possible variations of group types in the Microsoft ecosystem.
 */
export enum GroupType {
	/**
	 * Azure Active Directory Group
	 */
	AAD = 1 << 0,
	/**
	 * Microsoft 365 Group
	 */
	M365 = 1 << 1,
	/**
	 * SharePoint Online Security Group
	 */
	SPO = 1 << 2
}
