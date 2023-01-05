import { styled } from "@fluentui/react";
import { PeoplePickerItemSuggestionBase } from "./PeoplePickerItemSuggestion.base";
import { getStyles } from "./PeoplePickerItemSuggestion.styles";
import {
	IPeoplePickerItemSuggestionProps,
	IPeoplePickerItemSuggestionStyleProps,
	IPeoplePickerItemSuggestionStyles
} from "./PeoplePickerItemSuggestion.types";

export const PeoplePickerItemSuggestion = styled<
	IPeoplePickerItemSuggestionProps,
	IPeoplePickerItemSuggestionStyleProps,
	IPeoplePickerItemSuggestionStyles
>(PeoplePickerItemSuggestionBase, getStyles, undefined, {
	scope: "PickerItemSuggestion"
});
