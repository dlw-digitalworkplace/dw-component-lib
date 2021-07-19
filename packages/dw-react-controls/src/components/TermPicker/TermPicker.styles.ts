import { getStyles as getBasePickerStyles } from "office-ui-fabric-react/lib/components/pickers/BasePicker.styles";
import { concatStyleSets } from "office-ui-fabric-react/lib/Styling";
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
