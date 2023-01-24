import { BasePicker, initializeComponentRef, IPickerItemProps } from "@fluentui/react";
import * as React from "react";
import { ITermValue } from "./models";
import { TermItem } from "./TermItem";
import { TermItemSuggestion } from "./TermItemSuggestion";
import { ITermPickerProps } from "./TermPicker.types";

export class TermPickerBase extends BasePicker<ITermValue, ITermPickerProps> {
	public static defaultProps: Partial<ITermPickerProps> = {
		onRenderItem: (props: IPickerItemProps<ITermValue>) => <TermItem {...props}>{props.item.name}</TermItem>,
		onRenderSuggestionsItem: (props: ITermValue) => <TermItemSuggestion term={props} />,
		pickerSuggestionsProps: {
			loadingText: "Searching...",
			noResultsFoundText: "No results found.",
			suggestionsHeaderText: "Suggested terms"
		}
	};

	constructor(props: ITermPickerProps) {
		super(props);

		initializeComponentRef(this);
	}
}
