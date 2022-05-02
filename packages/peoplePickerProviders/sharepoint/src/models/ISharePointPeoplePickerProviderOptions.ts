import { PrincipalType } from "./PrincipalType";

export interface ISharePointPeoplePickerProviderOptions {
	/**
	 * Specifies which types of resources the provider should search for.
	 */
	principalTypes: PrincipalType;
}
