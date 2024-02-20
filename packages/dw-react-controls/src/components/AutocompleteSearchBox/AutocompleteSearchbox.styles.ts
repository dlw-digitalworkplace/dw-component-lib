import { IAutocompleteSearchBoxStyleProps, IAutocompleteSearchBoxStyles } from "./AutocompleteSearchBox.types";

const GlobalClassNames = {
	root: "dw-AutocompleteSearchBox-root",
	confirmation: "dw-AutocompleteSearchBox-confirmation",
	calloutProgressIndicatorPlaceholder: "dw-AutocompleteSearchBox-calloutProgressIndicatorPlaceholder",
	calloutTitle: "dw-AutocompleteSearchBox-calloutTitle",
	calloutContent: "dw-AutocompleteSearchBox-calloutContent",
	suggestion: "dw-AutocompleteSearchBox-suggestion",
	suggestionLink: "dw-AutocompleteSearchBox-suggestionLink"
};

export const getStyles = (props: IAutocompleteSearchBoxStyleProps): IAutocompleteSearchBoxStyles => {
	const { className, theme, hideIcon } = props;
	const classNames = GlobalClassNames;

	return {
		root: [
			classNames.root,
			{
				paddingLeft: hideIcon ? 8 : "4px"
			},
			className
		],
		confirmation: [
			classNames.confirmation,
			{
				margin: "-1px 0px",
				span: {
					width: "100%",

					i: {
						color: theme?.semanticColors?.disabledText
					}
				},
				">button": {
					height: "30px"
				}
			}
		],
		calloutProgressIndicatorPlaceholder: [
			classNames.calloutProgressIndicatorPlaceholder,
			{
				height: "10px"
			}
		],
		calloutTitle: [
			classNames.calloutTitle,
			{
				fontSize: "16px",
				padding: "2px 5px"
			}
		],
		calloutContent: [
			classNames.calloutContent,
			{
				display: "flex",
				flexDirection: "column"
			}
		],
		suggestion: [
			classNames.suggestion,
			{
				cursor: "pointer",
				"&:hover": {
					backgroundColor: theme?.semanticColors?.listItemBackgroundHovered
				}
			}
		],
		suggestionLink: [classNames.suggestionLink, {}],
		subComponentStyles: {
			searchbox: {
				iconContainer: {
					display: hideIcon ? "none" : "inherit"
				}
			},
			callout: {
				root: {
					marginTop: 0,
					overflow: "hidden",
					width: "100%"
				},
				container: {
					zIndex: 1,
					position: "relative"
				},
				calloutMain: {
					maxHeight: "500px !important"
				}
			},
			progressIndicator: {
				root: {
					margin: "4px 0px"
				},
				itemProgress: {
					padding: "0px"
				}
			},
			suggestionLink: {
				root: {
					color: "unset",
					width: "100%",
					padding: "2px 5px",
					"&:focus": {
						backgroundColor: theme?.semanticColors?.listItemBackgroundHovered,
						color: "unset",
						outline: "none !important",
						boxShadow: "none !important"
					},
					"&:active": {
						color: "unset",
						textDecoration: "none"
					},
					"&:hover": {
						color: "unset",
						textDecoration: "none"
					},
					"&:active:hover": {
						color: "unset",
						textDecoration: "none"
					}
				}
			}
		}
	};
};
