import * as React from "react";
import { BasePicker } from "office-ui-fabric-react/lib/components/pickers/BasePicker";
import { IGroup, IUser } from "../models";
import { IPickerItemProps } from "office-ui-fabric-react/lib/Pickers";
import { IUserOrGroupPickerProps } from "./UserOrGroupPicker.types";
import { PeoplePickerItemSuggestion } from "./PeoplePickerItemSuggestion/PeoplePickerItemSuggestion";
import { PeoplePickerItem } from "./PeoplePickerItem/PeoplePickerItem";

export const UserOrGroupPickerBase: React.FC<IUserOrGroupPickerProps> = (props: IUserOrGroupPickerProps) => {

	const onRenderItem = (pickerProps: IPickerItemProps<IUser | IGroup>) => {
		return <PeoplePickerItem {...pickerProps} />
	};

	const onRenderSuggestionItem = (item: IUser | IGroup) => {
		if (!!props.onRenderSuggestion) {
			return props.onRenderSuggestion(item);
		}
		return <PeoplePickerItemSuggestion
			title={item.displayName}
			label={"userPrincipalName" in item ? item.userPrincipalName : item.description}
		/>
	}

	return (
		<BasePicker
			{...props}
			onRenderItem={onRenderItem}
			onRenderSuggestionsItem={onRenderSuggestionItem}
			pickerSuggestionsProps={{
				loadingText: "Searching...",
				noResultsFoundText: "No results found.",
				suggestionsHeaderText: "Suggestions"
			}}
		/>
	)
}
