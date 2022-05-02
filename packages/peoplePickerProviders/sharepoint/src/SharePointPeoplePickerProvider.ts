// tslint:disable:no-bitwise

/**
 * Based on code provided at
 * https://github.com/pnp/sp-dev-fx-controls-react/blob/fa7cafb1acd97b313104abe29f01595bb9d403f4/src/services/PeopleSearchService.ts#L172
 */

import {
	IGroup,
	IPeoplePickerFilterOptions,
	IPeoplePickerProvider,
	IUser
} from "@dlw-digitalworkplace/dw-react-controls";
import { GraphPeoplePickerProvider, GroupType, ResourceType } from "@dlw-digitalworkplace/peoplepickerprovider-graph";
import { SPHttpClient } from "@microsoft/sp-http";
import * as deepmerge from "deepmerge";
import { ISharePointPeoplePickerProviderOptions } from "./models/ISharePointPeoplePickerProviderOptions";
import { PrincipalType } from "./models/PrincipalType";

/**
 * Provides PeoplePicker data using the same endpoints as the default SharePoint people picker.
 */
export class SharePointPeoplePickerProvider implements IPeoplePickerProvider {
	private _graphProvider: IPeoplePickerProvider;
	private _providerOptions: ISharePointPeoplePickerProviderOptions;

	private _siteUrl: string;
	private _spHttpClient: SPHttpClient;
	private _withSearchMoreCapability: boolean = false;

	private readonly DEFAULTOPTIONS: Partial<ISharePointPeoplePickerProviderOptions> = {};

	constructor(siteUrl: string, spHttpClient: SPHttpClient, options: ISharePointPeoplePickerProviderOptions) {
		this._siteUrl = siteUrl;
		this._spHttpClient = spHttpClient;

		this._providerOptions = deepmerge(this.DEFAULTOPTIONS, options);
	}

	public get hasSearchMoreCapability(): boolean {
		return this._withSearchMoreCapability;
	}

	public withSearchMoreCapability(
		graphTokenProvider: string | (() => string) | (() => PromiseLike<string>)
	): SharePointPeoplePickerProvider {
		let graphResourceTypes: ResourceType = 0x0;
		let graphGroupType: GroupType = 0x0;

		// Build graph provider options
		if (this._providerOptions.principalTypes & PrincipalType.User) {
			graphResourceTypes = graphResourceTypes | ResourceType.User;
		}
		if (this._providerOptions.principalTypes & PrincipalType.DistributionList) {
			graphResourceTypes = graphResourceTypes | ResourceType.Group;
			graphGroupType = graphGroupType | GroupType.Distribution;
		}
		if (this._providerOptions.principalTypes & PrincipalType.SecurityGroup) {
			graphResourceTypes = graphResourceTypes | ResourceType.Group;
			graphGroupType = graphGroupType | GroupType.Security;
		}

		// Create graph provider
		this._graphProvider = new GraphPeoplePickerProvider(graphTokenProvider, {
			resourceTypes: graphResourceTypes!,
			groupTypes: graphGroupType!
		});

		// Enable search more capability
		this._withSearchMoreCapability = true;

		return this;
	}

	public async findUsersOrGroups(
		search: string,
		options: Partial<IPeoplePickerFilterOptions> = {}
	): Promise<(IUser | IGroup)[]> {
		const defaultOptions: IPeoplePickerFilterOptions = {
			idsToIgnore: []
		};

		// build final options object
		const finalOptions = deepmerge(defaultOptions, options);

		if (this.hasSearchMoreCapability) {
			// search graph api first when "search more" capability is enabled
			const graphApiResult = await this._searchGraphApi(search, finalOptions);

			// if the graph api returned results, return those
			if (graphApiResult.length > 0) {
				return graphApiResult;
			}
		}

		// search sharepoint api when "search more" capability is disabled or graph api returned no results
		const spApiResult = await this._searchSharePointApi(search, finalOptions);

		return spApiResult;
	}

	public async findMoreUsersOrGroups(
		search: string,
		options: Partial<IPeoplePickerFilterOptions> = {}
	): Promise<(IUser | IGroup)[]> {
		const defaultOptions: IPeoplePickerFilterOptions = {
			idsToIgnore: []
		};

		// build final options object
		const finalOptions = deepmerge(defaultOptions, options);

		// search sharepoint api
		const spApiResult = await this._searchSharePointApi(search, finalOptions);

		return spApiResult;
	}

	private _searchGraphApi(
		search: string,
		options: IPeoplePickerFilterOptions
	): (IUser | IGroup)[] | Promise<(IUser | IGroup)[]> {
		return this._graphProvider.findUsersOrGroups(search, options);
	}

	private async _searchSharePointApi(search: string, options: IPeoplePickerFilterOptions): Promise<(IUser | IGroup)[]> {
		const searchBody = {
			queryParams: {
				AllowEmailAddresses: true,
				AllowMultipleEntities: false,
				AllUrlZones: false,
				MaximumEntitySuggestions: 30,
				PrincipalSource: 15,
				PrincipalType: this._providerOptions.principalTypes,
				QueryString: search,
				SharePointGroupID: 0
			}
		};

		const response = await this._spHttpClient.fetch(
			`${this._siteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerSearchUser`,
			SPHttpClient.configurations.v1,
			{
				method: "POST",
				body: JSON.stringify(searchBody),
				headers: {
					accept: "application/json",
					"content-type": "application/json"
				}
			}
		);

		if (!response.ok) {
			// todo: do something with the error
			return [];
		}

		const apiResult = await response.json();

		if (!apiResult || !apiResult.value) {
			return [];
		}

		let apiResultValues: any[] = typeof apiResult.value === "string" ? JSON.parse(apiResult.value) : apiResult.value;

		// filter out "UNVALIDATED_EMAIL_ADDRESS"
		apiResultValues = apiResultValues.filter(
			(it: any) => !(it.EntityData && it.EntityData.PrincipalType === "UNVALIDATED_EMAIL_ADDRESS")
		);

		apiResultValues = apiResultValues.filter((it: any) => !!it.Key);

		const result = apiResultValues
			.map(this._parseSearchResult)
			.filter((it: IUser | IGroup) => !options.idsToIgnore.includes(it.id));

		return result.filter((it) => !!it) as (IUser | IGroup)[];
	}

	private _parseSearchResult(result: any): IUser | IGroup | undefined {
		switch (result.EntityType) {
			case "User":
				const userPrincipalName = result.Key.split("|").pop();
				const user: IUser = {
					type: "User",
					id: result.EntityData?.ObjectId || result.Key,
					displayName: result.DisplayText,
					userPrincipalName: userPrincipalName,
					additionalProperties: {
						key: result.Key,
						entityType: result.EntityType
					}
				};

				return user;

			case "SecGroup":
			case "FormsRole":
				const groupId = result.Key.split("|").pop();
				const secGroup: IGroup = {
					type: "Group",
					id: groupId,
					displayName: result.DisplayText,
					additionalProperties: {
						key: result.Key,
						entityType: result.EntityType
					}
				};
				return secGroup;

			case "SPGroup": {
				const spGroup: IGroup = {
					type: "Group",
					id: result.EntityData.SPGroupID,
					displayName: result.DisplayText,
					additionalProperties: {
						key: result.Key,
						entityType: result.EntityType
					}
				};
				return spGroup;
			}
		}

		return undefined;
	}
}
