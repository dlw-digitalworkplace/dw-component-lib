import { concatStyleSets } from "@fluentui/react";
import { getStyles as getBasePickerStyles } from "@fluentui/react/lib/components/pickers/BasePicker.styles";
import { ITermPickerStyleProps, ITermPickerStyles } from "./TermPicker.types";

export const getStyles = (props: ITermPickerStyleProps): ITermPickerStyles => {
	const { isInvalid, styles: customStyles, theme } = props;

	const basePickerStyles: ITermPickerStyles = getBasePickerStyles(props);
	const defaultPickerStyles: Partial<ITermPickerStyles> = {
		text: isInvalid && {
			borderColor: theme!.semanticColors.errorText,
			selectors: {
				"&:hover": {
					borderColor: theme!.semanticColors.errorText
				}
			}
		}
	};

	return concatStyleSets(basePickerStyles, defaultPickerStyles, customStyles);
};
