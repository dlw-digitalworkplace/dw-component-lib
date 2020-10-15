import { ITaxonomyPickerStyleProps, ITaxonomyPickerStyles } from "./TaxonomyPicker.types";

const GlobalClassNames = {
	taxonomyPicker: "dw-TaxonomyPicker",
	inputWrapper: "dw-TaxonomyPicker-container"
};

export const getStyles = (props: ITaxonomyPickerStyleProps): ITaxonomyPickerStyles => {
	const { className } = props;
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
		]
	};
};
