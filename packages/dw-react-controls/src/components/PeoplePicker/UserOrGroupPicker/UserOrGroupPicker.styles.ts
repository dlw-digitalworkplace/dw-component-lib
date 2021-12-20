import { getStyles as getBasePickerStyles } from "office-ui-fabric-react/lib/components/pickers/BasePicker.styles";
import { concatStyleSets } from "office-ui-fabric-react/lib/Styling";
import { IUserOrGroupPickerStyleProps, IUserOrGroupPickerStyles } from "./UserOrGroupPicker.types";

export const getStyles = (props: IUserOrGroupPickerStyleProps): IUserOrGroupPickerStyles => {
	const { isInvalid, styles: customStyles, theme } = props;

	const basePickerStyles: IUserOrGroupPickerStyles = getBasePickerStyles(props);
	const defaultPickerStyles: Partial<IUserOrGroupPickerStyles> = {
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
