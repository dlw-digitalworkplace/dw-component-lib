import { getStyles as getBasePickerStyles } from "office-ui-fabric-react/lib/components/pickers/BasePicker.styles";
import { concatStyleSets } from "office-ui-fabric-react/lib/Styling";
import { IUserOrGroupPickerStyleProps, IUserOrGroupPickerStyles } from "./UserOrGroupPicker.types";

export const getStyles = (props: IUserOrGroupPickerStyleProps): IUserOrGroupPickerStyles => {
	const { styles: customStyles } = props;

	const basePickerStyles: IUserOrGroupPickerStyles = getBasePickerStyles(props);

	return concatStyleSets(basePickerStyles, customStyles);
};
