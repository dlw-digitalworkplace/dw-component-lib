import { IGroup } from "./IGroup";
import { IPeoplePickerFilterOptions } from "./IPeoplePickerFilterOptions";
import { IUser } from "./IUser";

export interface IPeoplePickerProvider {
	hasSearchMoreCapability?: boolean;

	findUsersOrGroups(
		search: string,
		options?: Partial<IPeoplePickerFilterOptions>
	): (IUser | IGroup)[] | Promise<(IUser | IGroup)[]>;

	findMoreUsersOrGroups(
		search: string,
		options?: Partial<IPeoplePickerFilterOptions>
	): (IUser | IGroup)[] | Promise<(IUser | IGroup)[]>;
}
