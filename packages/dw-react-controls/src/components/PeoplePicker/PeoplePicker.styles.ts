import { AnimationClassNames } from "office-ui-fabric-react/lib/Styling";
import { IPeoplePickerStyleProps, IPeoplePickerStyles } from "./PeoplePicker.types";

const GlobalClassNames = {
	root: "dw-PeoplePicker",
	picker: "dw-PeoplePicker-picker",
	inputWrapper: "dw-PeoplePicker-container",
	errorMessage: "dw-PeoplePicker-errorMessage",
	successMessage: "dw-PeoplePicker-successMessage"
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
		],
		successMessage: [
			classNames.successMessage,
			AnimationClassNames.slideDownIn20,
			fonts.small,
			{
				color: semanticColors.successText,
				margin: 0,
				paddingTop: 5,
				display: "flex",
				alignItems: "center"
			}
		]
	};
};
