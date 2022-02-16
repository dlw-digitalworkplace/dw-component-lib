// tslint:disable:no-bitwise

import {
	IGroup,
	IPeoplePickerFilterOptions,
	IPeoplePickerProvider,
	IUser
} from "@dlw-digitalworkplace/dw-react-controls";
import { Group, User } from "@microsoft/microsoft-graph-types";
import * as deepmerge from "deepmerge";
import { GraphResponse } from "./models/GraphResponse";
import { GroupType } from "./models/GroupType";
import { IGraphPeoplePickerProviderOptions } from "./models/IGraphPeoplePickerProviderOptions";
import { ResourceType } from "./models/ResourceType";

/**
 * Provides PeoplePicker data using the Graph API.
 */
export class GraphPeoplePickerProvider implements IPeoplePickerProvider {
	public GraphToken: string;
	private _providerOptions: IGraphPeoplePickerProviderOptions;

	private readonly DEFAULTOPTIONS: IGraphPeoplePickerProviderOptions = {
		resourceTypes: ResourceType.User | ResourceType.Group,
		groupTypes: GroupType.M365 | GroupType.Security | GroupType.Distribution
	};

	constructor(graphToken: string, options: IGraphPeoplePickerProviderOptions) {
		this.GraphToken = graphToken;

		this._providerOptions = deepmerge(this.DEFAULTOPTIONS, options);
	}

	public async findUserOrGroup(
		search: string,
		options: Partial<IPeoplePickerFilterOptions> = {}
	): Promise<(IUser | IGroup)[]> {
		const defaultOptions: IPeoplePickerFilterOptions = {
			idsToIgnore: []
		};

		// build final options object
		const finalOptions = deepmerge(defaultOptions, options);

		const promises: Promise<(IUser | IGroup)[]>[] = [];

		if ((this._providerOptions.resourceTypes & ResourceType.User) === ResourceType.User) {
			promises.push(this._findUsers(search, finalOptions));
		}

		if ((this._providerOptions.resourceTypes & ResourceType.Group) === ResourceType.Group) {
			promises.push(this._findGroups(search, finalOptions));
		}

		// wait for all promises to return
		const promiseResults = await Promise.all(promises);

		// merge result sets
		const result = promiseResults.reduce((acc, cur) => acc.concat(cur), []);

		return result.sort((a, b) => {
			return a.displayName.localeCompare(b.displayName);
		});
	}

	private async _findUsers(search: string, options: IPeoplePickerFilterOptions): Promise<IUser[]> {
		let searchClause = "";
		searchClause += `"displayName:${search}"`;
		searchClause += ` OR "userPrincipalName:${search}"`;
		searchClause += ` OR "givenName:${search}"`;
		searchClause += ` OR "surname:${search}"`;
		searchClause += ` OR "mail:${search}"`;

		let filterClause = "";
		if (options.idsToIgnore.length > 0) {
			filterClause += "not(id in (";
			filterClause += options.idsToIgnore.map((id) => `"${id}"`).join(",");
			filterClause += "))";
		}

		const userResponse = await fetch(
			`https://graph.microsoft.com/v1.0/users?$search=${searchClause}&$filter=${filterClause}&$count=true`,
			{
				headers: {
					ConsistencyLevel: "Eventual",
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.GraphToken}`
				}
			}
		);

		if (!userResponse.ok) {
			// todo: do something with the error
			return [];
		}

		const graphUsersResult: GraphResponse<User[]> = await userResponse.json();

		return graphUsersResult.value.map<IUser>((graphUser) => ({
			type: "User",
			id: graphUser.id!,
			displayName: graphUser.displayName!,
			userPrincipalName: graphUser.userPrincipalName!
		}));
	}

	private async _findGroups(search: string, options: IPeoplePickerFilterOptions): Promise<IGroup[]> {
		let searchClause = "";
		searchClause += `"displayName:${search}"`;
		searchClause += ` OR "description:${search}"`;
		searchClause += ` OR "mail:${search}"`;

		const filterClause = this._getGroupFilterString(options.idsToIgnore);

		const userResponse = await fetch(
			`https://graph.microsoft.com/v1.0/groups?$search=${searchClause}&$filter=${filterClause}&$count=true`,
			{
				headers: {
					ConsistencyLevel: "Eventual",
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.GraphToken}`
				}
			}
		);

		if (!userResponse.ok) {
			// todo: do something with the error
			return [];
		}

		const graphGroupsResult: GraphResponse<Group[]> = await userResponse.json();

		return graphGroupsResult.value.map<IGroup>((graphGroup) => ({
			type: "Group",
			id: graphGroup.id!,
			displayName: graphGroup.displayName!
		}));
	}

	private _getGroupFilterString(idsToIgnore: string[] = []): string {
		if (!this._providerOptions.groupTypes) {
			return "";
		}

		const m365Clause = "groupTypes/any(g: g eq 'Unified')";
		const securityClause = "not(groupTypes/any(g: g eq 'Unified')) AND securityEnabled eq true";
		const distributionClause =
			"not(groupTypes/any(g: g eq 'Unified')) AND mailEnabled eq true AND securityEnabled eq false";

		const clauses: string[] = [];

		const withM365 = (this._providerOptions.groupTypes & GroupType.M365) === GroupType.M365;
		const withSecurity = (this._providerOptions.groupTypes & GroupType.Security) === GroupType.Security;
		const withDistribution = (this._providerOptions.groupTypes & GroupType.Distribution) === GroupType.Distribution;

		if (!withM365 || !withSecurity || !withDistribution) {
			if (withM365) {
				clauses.push(m365Clause);
			}
			if (withSecurity) {
				clauses.push(securityClause);
			}
			if (withDistribution) {
				clauses.push(distributionClause);
			}
		}

		const groupsClause = clauses.map((it) => `(${it})`).join(" OR ");

		if (idsToIgnore.length === 0) {
			return groupsClause;
		}

		let filterClause = groupsClause.length > 0 ? `(${groupsClause}) AND ` : "";

		filterClause += "not(id in (";
		filterClause += idsToIgnore.map((id) => `"${id}"`).join(",");
		filterClause += "))";

		return filterClause;
	}
}
