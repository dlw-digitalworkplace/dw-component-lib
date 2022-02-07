import {
	IGroup,
	IPeoplePickerFilterOptions,
	IPeoplePickerProvider,
	IUser
} from "@dlw-digitalworkplace/dw-react-controls";
import { Group, User } from "@microsoft/microsoft-graph-types";
import * as deepmerge from "deepmerge";
import { GraphResponse } from "./models/GraphResponse";

/**
 * Provides PeoplePicker data using the Graph API.
 */
export class GraphPeoplePickerProvider implements IPeoplePickerProvider {
	public GraphToken: string;
	private _includeUsers: boolean;
	private _includeGroups: boolean;

	constructor(graphToken: string, includeUsers: boolean = true, includeGroups: boolean = true) {
		this.GraphToken = graphToken;

		this._includeUsers = includeUsers;
		this._includeGroups = includeGroups;
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

		let promises: Promise<(IUser | IGroup)[]>[] = [];

		if (this._includeUsers) {
			promises.push(this.findUsers(search, finalOptions));
		}

		if (this._includeGroups) {
			promises.push(this.findGroups(search, finalOptions));
		}

		// wait for all promises to return
		const promiseResults = await Promise.all(promises);

		// merge result sets
		const result = promiseResults.reduce((acc, cur) => acc.concat(cur), []);

		return result.sort((a, b) => {
			return a.displayName.localeCompare(b.displayName);
		});
	}

	private async findGroups(search: string, options: IPeoplePickerFilterOptions): Promise<IGroup[]> {
		let searchClause = "";
		searchClause += `"displayName:${search}"`;
		searchClause += ` OR "description:${search}"`;
		searchClause += ` OR "mail:${search}"`;

		let filterClause = "";
		if (options.idsToIgnore.length > 0) {
			filterClause += "not(id in (";
			filterClause += options.idsToIgnore.map((id) => `"${id}"`).join(",");
			filterClause += "))";
		}

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

	private async findUsers(search: string, options: IPeoplePickerFilterOptions): Promise<IUser[]> {
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
}
