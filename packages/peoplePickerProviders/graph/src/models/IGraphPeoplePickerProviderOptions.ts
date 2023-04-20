import { GroupType } from "./GroupType";
import { ResourceType } from "./ResourceType";

export interface IGraphPeoplePickerProviderOptions {
	/**
	 * Specifies which types of resources the provider should search for.
	 */
	resourceTypes: ResourceType;

	/**
	 * If "Group" is specified in the resourceTypes, then this property specifies the types of group to search for.
	 * @default GroupType.M365 | GroupType.Security | GroupType.Distribution
	 */
	groupTypes?: GroupType;

	/**
	 * Specifies what endpoint the provider should use, either /me/people or /users
	 */
	useMeEndpoint?: boolean;
}
