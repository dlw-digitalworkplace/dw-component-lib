import { BasePicker } from "office-ui-fabric-react/lib/components/pickers/BasePicker";
import { IPickerItemProps } from "office-ui-fabric-react/lib/Pickers";
import * as React from "react";
import { IGroup, IUser, PeoplePickerValue } from "../models";
import { PeoplePickerItem } from "./PeoplePickerItem/PeoplePickerItem";
import { PeoplePickerItemSuggestion } from "./PeoplePickerItemSuggestion/PeoplePickerItemSuggestion";
import { IUserOrGroupPickerProps } from "./UserOrGroupPicker.types";

export const UserOrGroupPickerBase: React.FC<IUserOrGroupPickerProps> = (props: IUserOrGroupPickerProps) => {
	const onRenderItem = (pickerProps: IPickerItemProps<PeoplePickerValue>) => {
		return <PeoplePickerItem {...pickerProps} />;
	};

	const onRenderSuggestionItem = (item: IUser | IGroup) => {
		if (!!props.onRenderSuggestion) {
			return props.onRenderSuggestion(item);
		}
		return (
			<PeoplePickerItemSuggestion
				title={item.displayName}
				label={"userPrincipalName" in item ? item.userPrincipalName : item.description}
			/>
		);
	};

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
	);
};
