import * as React from "react";
import { BasePicker } from "office-ui-fabric-react/lib/components/pickers/BasePicker";
import { initializeComponentRef } from "office-ui-fabric-react/lib/Utilities";
import { IGroup, IUser } from "../models";
import { IPickerItemProps } from "office-ui-fabric-react/lib/Pickers";
import { IUserOrGroupPickerProps } from "./UserOrGroupPicker.types";
import { PeoplePickerItemSuggestion } from "./PeoplePickerItemSuggestion/PeoplePeoplePickerItemSuggestion";
import { PeoplePickerItem } from "./PeoplePickerItem/PeoplePickerItem";

export class UserOrGroupPickerBase extends BasePicker<IUser | IGroup, IUserOrGroupPickerProps> {

	public static defaultProps: Partial<IUserOrGroupPickerProps> = {
		onRenderItem: (props: IPickerItemProps<IUser | IGroup>) => <PeoplePickerItem {...props} />,
		onRenderSuggestionsItem: (item: IUser | IGroup) => <PeoplePickerItemSuggestion item={item} />
	};

	constructor(props: IUserOrGroupPickerProps) {
		super(props);
		initializeComponentRef(this);
	};
}
