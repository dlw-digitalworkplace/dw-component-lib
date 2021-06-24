import { ITermAdderStyleProps, ITermAdderStyles } from "./TermAdder.types";

const GlobalClassNames = {
	termAdder: "dw-TermAdder",
	textField: "dw-TermAdderField",
	button: "dw-TermAdderButton",
	spinner: "dw-TermAdderSpinner"
};

export const getStyles = (props: ITermAdderStyleProps): ITermAdderStyles => {
	const { className } = props;
	const classNames = GlobalClassNames;

	return {
		termAdder: [
			classNames.termAdder,
			{
				display: "flex",
				marginLeft: "22px"
			},
			className
		],

		textField: [
			classNames.textField,
			{
				maxWidth: "175px"
			}
		],

		button: [
			classNames.button,
			{
				width: "24px"
			}
		],

		spinner: [
			classNames.spinner,
			{
				height: "32px",
				width: "24px"
			}
		]
	};
};
