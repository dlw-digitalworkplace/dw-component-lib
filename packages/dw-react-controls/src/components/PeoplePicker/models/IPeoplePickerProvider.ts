import { IGroup } from "./IGroup";
import { IPeoplePickerFilterOptions } from "./IPeoplePickerFilterOptions";
import { IUser } from "./IUser";

export interface IPeoplePickerProvider {
	findUserOrGroup(
		search?: string,
		options?: IPeoplePickerFilterOptions
	): (IUser | IGroup)[] | Promise<(IUser | IGroup)[]>
}
