import { styled } from "@fluentui/react";
import { PeoplePickerItemBase } from "./PeoplePickerItem.base";
import { getStyles } from "./PeoplePickerItem.styles";
import { IPeoplePickerItemProps, IPeoplePickerItemStyleProps, IPeoplePickerItemStyles } from "./PeoplePickerItem.types";

export const PeoplePickerItem = styled<IPeoplePickerItemProps, IPeoplePickerItemStyleProps, IPeoplePickerItemStyles>(
	PeoplePickerItemBase,
	getStyles,
	undefined,
	{
		scope: "PeoplePickerItem"
	}
);
