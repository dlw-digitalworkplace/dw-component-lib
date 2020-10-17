import { BasePicker } from "office-ui-fabric-react/lib/components/pickers/BasePicker";
import { IPickerItemProps } from "office-ui-fabric-react/lib/components/pickers/PickerItem.types";
import { initializeComponentRef } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { ITermValue } from "../../models/ITermValue";
import { TermItem } from "./TermItem";
import { TermItemSuggestion } from "./TermItemSuggestion";
import { ITermPickerProps } from "./TermPicker.types";

export class TermPickerBase extends BasePicker<ITermValue, ITermPickerProps> {
	public static defaultProps = {
		onRenderItem: (props: IPickerItemProps<ITermValue>) => <TermItem {...props}>{props.item.name}</TermItem>,
		onRenderSuggestionsItem: (props: ITermValue) => <TermItemSuggestion {...props}>{props.name}</TermItemSuggestion>
	};

	constructor(props: ITermPickerProps) {
		super(props);

		initializeComponentRef(this);
	}
}