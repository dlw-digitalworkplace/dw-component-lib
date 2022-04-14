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
import { SPHttpClient } from "@microsoft/sp-http";
import * as deepmerge from "deepmerge";
import { ISharePointPeoplePickerProviderOptions } from "./models/ISharePointPeoplePickerProviderOptions";

/**
 * Provides PeoplePicker data using the same endpoints as the default SharePoint people picker.
 */
export class SharePointPeoplePickerProvider implements IPeoplePickerProvider {
	private _providerOptions: ISharePointPeoplePickerProviderOptions;

	private _siteUrl: string;
	private _spHttpClient: SPHttpClient;

	private readonly DEFAULTOPTIONS: Partial<ISharePointPeoplePickerProviderOptions> = {};

	constructor(siteUrl: string, spHttpClient: SPHttpClient, options: ISharePointPeoplePickerProviderOptions) {
		this._siteUrl = siteUrl;
		this._spHttpClient = spHttpClient;

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
			.filter((it: IUser | IGroup) => !finalOptions.idsToIgnore.includes(it.id));

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
