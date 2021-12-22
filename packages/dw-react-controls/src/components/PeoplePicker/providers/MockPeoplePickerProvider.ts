// tslint:disable:no-bitwise
import { SearchType } from "..";
import { GroupType } from "../models/GroupType";
import { IGroup } from "../models/IGroup";
import { IPeoplePickerFilterOptions } from "../models/IPeoplePickerFilterOptions";
import { IPeoplePickerProvider } from "../models/IPeoplePickerProvider";
import { IUser } from "../models/IUser";
import { MockGroups } from "./MockGroups";
import { MockUsers } from "./MockUsers";
export class MockPeoplePickerProvider implements IPeoplePickerProvider {

	private _mockUsers: IUser[];
	private _mockGroups: IGroup[];

	constructor() {
		this._mockUsers = MockUsers;
		this._mockGroups = MockGroups;
	}

	public findUserOrGroup(
		search: string,
		options: IPeoplePickerFilterOptions
	): (IUser | IGroup)[] | Promise<(IUser | IGroup)[]> {

		let filteredUsers: IUser[] = [];
		let filteredGroups: IGroup[] = [];

		// Filter Users
		if ((options.searchFor & SearchType.Users) === SearchType.Users) {
			filteredUsers = this._mockUsers.filter(d => (
				d.displayName.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
				!options.idsToIgnore.some(i => i === d.id)
			));
		}

		// Filter Groups
		if ((options.searchFor & SearchType.Groups) === SearchType.Groups) {
			const allGroups = this._mockGroups.filter(d => (
				d.displayName.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
				!options.idsToIgnore.some(i => i === d.id)
			));

			const aadGroups = options?.groupTypes && (options.groupTypes & GroupType.AAD) === GroupType.AAD
				? allGroups.filter(g => (g.groupType & GroupType.AAD) === GroupType.AAD)
				: [];

			const spoGroups = options?.groupTypes && (options.groupTypes & GroupType.SPO) === GroupType.SPO
				? allGroups.filter(g => (g.groupType & GroupType.SPO) === GroupType.SPO)
				: [];

			const m365Groups = options?.groupTypes && (options.groupTypes & GroupType.M365) === GroupType.M365
				? allGroups.filter(g => (g.groupType & GroupType.M365) === GroupType.M365)
				: [];

			filteredGroups = [...aadGroups, ...spoGroups, ...m365Groups]
		}

		// Return all
		const allData = [...filteredUsers, ...filteredGroups];
		return new Promise(resolve => setTimeout(() => resolve(allData), 500));
	}
}
