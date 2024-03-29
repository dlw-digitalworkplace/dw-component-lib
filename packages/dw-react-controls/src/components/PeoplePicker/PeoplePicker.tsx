import { styled } from "@fluentui/react";
import { PeoplePickerBase } from "./PeoplePicker.base";
import { getStyles } from "./PeoplePicker.styles";
import { IPeoplePickerProps, IPeoplePickerStyleProps, IPeoplePickerStyles } from "./PeoplePicker.types";

export const PeoplePicker: React.FC<IPeoplePickerProps> = styled<
	IPeoplePickerProps,
	IPeoplePickerStyleProps,
	IPeoplePickerStyles
>(PeoplePickerBase, getStyles);
