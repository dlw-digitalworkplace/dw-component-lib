import { IWebPartTitleStyleProps, IWebPartTitleStyles } from "./WebPartTitle.types";

const GlobalClassNames = {
	root: "dw-WebPartTitle",
	title: "dw-WebPartTitle-Title",
	moreInfoLink: "dw-WebPartTitle-More"
};

export const getStyles = (props: IWebPartTitleStyleProps): IWebPartTitleStyles => {
	const { className, theme } = props;
	const classNames = GlobalClassNames;

	return {
		root: [
			classNames.root,
			{
				alignItems: "baseline",
				display: "flex",
				flexDirection: "row",
				justifyContent: "flex-end",
				marginBottom: "18px",
				marginLeft: theme.rtl && theme.spacing.l2,
				marginRight: !theme.rtl && theme.spacing.l2,
				marginTop: 0,
				whiteSpace: "pre-wrap"
			},
			className
		],

		title: [
			classNames.title,
			{
				...theme.fonts.xLarge,
				flexGrow: 1
			}
		],

		textarea: [
			{
				backgroundColor: "transparent",
				border: "none",
				boxSizing: "border-box",
				color: theme.semanticColors.bodyText,
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
		],

		moreInfoLink: [
			classNames.moreInfoLink,
			{
				fontSize: theme.fonts.medium.fontSize,
				whiteSpace: "nowrap"
			}
		]
	};
};
