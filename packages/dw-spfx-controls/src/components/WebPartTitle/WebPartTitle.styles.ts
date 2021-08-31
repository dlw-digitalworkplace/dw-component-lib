import { IWebPartTitleStyleProps, IWebPartTitleStyles } from "./WebPartTitle.types";

const GlobalClassNames = {
	root: "dw-WebPartTitle"
};

export const getStyles = (props: IWebPartTitleStyleProps): IWebPartTitleStyles => {
	const { className, theme } = props;
	const classNames = GlobalClassNames;

	return {
		root: [
			classNames.root,
			{
				...theme.fonts.xLarge,
				marginBottom: "18px",
				marginLeft: theme.rtl && theme.spacing.l2,
				marginRight: !theme.rtl && theme.spacing.l2,
				marginTop: 0,
				whiteSpace: "pre-wrap",

				textarea: {
					color: theme.semanticColors.bodyText
				}
			},
			className
		],

		textarea: [
			{
				backgroundColor: "transparent",
				border: "none",
				boxSizing: "border-box",
				display: "block",
				margin: 0,
				outline: 0,
				overflow: "hidden",
				resize: "none",
				width: "100%",
				fontSize: "inherit",
				fontWeight: "inherit",
				lineHeight: "inherit",
				textAlign: "inherit",

				"&::placeholder": {
					color: theme.semanticColors.bodySubtext
				}
			}
		]
	};
};
