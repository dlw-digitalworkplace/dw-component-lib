import { getStyles as getBasePickerStyles } from "office-ui-fabric-react/lib/components/pickers/BasePicker.styles";
import { AnimationClassNames, concatStyleSets } from "office-ui-fabric-react/lib/Styling";
import {
	IPeoplePickerInputStyleProps,
	IPeoplePickerInputStyles,
	IPeoplePickerStyleProps,
	IPeoplePickerStyles
} from "./PeoplePicker.types";

const GlobalClassNames = {
	root: "dw-PeoplePicker",
	picker: "dw-PeoplePicker-picker",
	inputWrapper: "dw-PeoplePicker-container",
	errorMessage: "dw-PeoplePicker-errorMessage"
};

export const getStyles = (props: IPeoplePickerStyleProps): IPeoplePickerStyles => {
	const { className, theme } = props;
	const { fonts, semanticColors } = theme;
	const classNames = GlobalClassNames;

	return {
		root: [classNames.root, className],
		inputWrapper: [
			classNames.inputWrapper,
			{
				display: "flex",
				alignItems: "center"
			}
		],
		input: [
			classNames.picker,
			{
				flexGrow: 1
			}
		],
		errorMessage: [
			classNames.errorMessage,
			AnimationClassNames.slideDownIn20,
			fonts.small,
			{
				color: semanticColors.errorText,
				margin: 0,
				paddingTop: 5,
				display: "flex",
				alignItems: "center"
			}
		]
	};
};

export const getInputStyles = (props: IPeoplePickerInputStyleProps): IPeoplePickerInputStyles => {
	const { isInvalid, styles: customStyles, theme } = props;

	const basePickerStyles: IPeoplePickerInputStyles = getBasePickerStyles(props);
	const defaultPickerStyles: Partial<IPeoplePickerInputStyles> = {
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
