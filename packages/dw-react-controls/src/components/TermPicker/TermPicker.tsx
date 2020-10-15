// import { getStyles } from "office-ui-fabric-react/lib/components/pickers/BasePicker.styles";
import { getStyles } from "office-ui-fabric-react/lib-commonjs/components/pickers/BasePicker.styles";
import { styled } from "office-ui-fabric-react/lib/Utilities";
import { TermPickerBase } from "./TermPicker.base";
import { ITermPickerProps, ITermPickerStyleProps, ITermPickerStyles } from "./TermPicker.types";

export const TermPicker = styled<ITermPickerProps, ITermPickerStyleProps, ITermPickerStyles>(
	TermPickerBase,
	getStyles,
	undefined,
	{
		scope: "TermPicker"
	}
);
