import { AnimationClassNames } from "office-ui-fabric-react/lib/Styling";
import { ITaxonomyPickerStyleProps, ITaxonomyPickerStyles } from "./TaxonomyPicker.types";

const GlobalClassNames = {
	taxonomyPicker: "dw-TaxonomyPicker",
	inputWrapper: "dw-TaxonomyPicker-container",
	errorMessage: "dw-TaxonomyPicker-errorMessage",
	successMessage: "dw-TaxonomyPicker-successMessage"
};

export const getStyles = (props: ITaxonomyPickerStyleProps): ITaxonomyPickerStyles => {
	const { className, theme } = props;
	const { fonts, semanticColors } = theme;
	const classNames = GlobalClassNames;

	return {
		taxonomyPicker: [classNames.taxonomyPicker, className],
		inputWrapper: [
			classNames.inputWrapper,
			{
				display: "flex",
				alignItems: "center"
			}
		],
		input: [
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
			classNames.errorMessage,
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
