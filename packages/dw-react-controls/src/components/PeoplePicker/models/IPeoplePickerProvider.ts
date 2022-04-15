import { IGroup } from "./IGroup";
import { IPeoplePickerFilterOptions } from "./IPeoplePickerFilterOptions";
import { IUser } from "./IUser";

export interface IPeoplePickerProvider {
	findUsersOrGroups(
		search: string,
		options?: Partial<IPeoplePickerFilterOptions>
	): (IUser | IGroup)[] | Promise<(IUser | IGroup)[]>;
}
