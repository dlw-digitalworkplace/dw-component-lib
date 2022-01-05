// tslint:disable:no-bitwise
import * as deepmerge from "deepmerge";
import { IGroup } from "../models/IGroup";
import { IPeoplePickerFilterOptions } from "../models/IPeoplePickerFilterOptions";
import { IPeoplePickerProvider } from "../models/IPeoplePickerProvider";
import { PeoplePickerValue } from "../models/IPeoplePickerValue";
import { IUser } from "../models/IUser";
import { MockGroups } from "./MockGroups";
import { MockUsers } from "./MockUsers";

export class MockPeoplePickerProvider implements IPeoplePickerProvider {
	private _mockUsers: IUser[] = MockUsers;
	private _mockGroups: IGroup[] = MockGroups;

	private _includeUsers: boolean;
	private _includeGroups: boolean;

	constructor(includeUsers: boolean = true, includeGroups: boolean = true) {
		this._includeUsers = includeUsers;
		this._includeGroups = includeGroups;
	}

	public findUserOrGroup(
		search: string,
		options: Partial<IPeoplePickerFilterOptions> = {}
	): PeoplePickerValue[] | Promise<PeoplePickerValue[]> {
		const defaultOptions: IPeoplePickerFilterOptions = {
			idsToIgnore: []
		};

		options = deepmerge(defaultOptions, options);

		let filteredUsers: IUser[] = [];
		let filteredGroups: IGroup[] = [];

		// Filter Users
		if (this._includeUsers) {
			filteredUsers = this._mockUsers.filter(
				(it) =>
					it.displayName.toLowerCase().indexOf(search.toLowerCase()) > -1 && options.idsToIgnore?.indexOf(it.id) === -1
			);
		}

		// Filter Groups
		if (this._includeGroups) {
			filteredGroups = this._mockGroups.filter(
				(it) =>
					it.displayName.toLowerCase().indexOf(search.toLowerCase()) > -1 && options.idsToIgnore?.indexOf(it.id) === -1
			);
		}

		// Return all
		const allData = [...filteredUsers, ...filteredGroups];
		return new Promise((resolve) => setTimeout(() => resolve(allData), 500));
	}
}
