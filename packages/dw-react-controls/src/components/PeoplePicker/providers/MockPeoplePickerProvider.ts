import { SearchType } from "..";
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
		if (options.searchFor === SearchType.UsersOnly || options.searchFor === SearchType.UsersAndGroups) {
			filteredUsers = this._mockUsers.filter(d => (
				d.displayName.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
				!options.idsToIgnore.some(i => i === d.id)
			));
		}

		// Filter Groups
		if (options.searchFor === SearchType.GroupsOnly || options.searchFor === SearchType.UsersAndGroups) {
			filteredGroups = this._mockGroups.filter(d => (
				d.displayName.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
				(options.groupTypes ? options.groupTypes.some(gt => gt === d.groupType) : true) &&
				!options.idsToIgnore.some(i => i === d.id)
			));
		}

		// Return all
		const allData = [...filteredUsers, ...filteredGroups];
		return new Promise(resolve => setTimeout(() => resolve(allData), 500));
	}
}
