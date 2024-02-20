import { IAutocompleteSearchBoxStyleProps, IAutocompleteSearchBoxStyles } from "./AutocompleteSearchBox.types";

const GlobalClassNames = {
	root: "dw-AutocompleteSearchBox-root",
	container: "dw-AutocompleteSearchBox-container",
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
		container: [classNames.container, {}],
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
					color: theme?.semanticColors?.bodyText,
					width: "100%",
					padding: "2px 5px",
					"&:focus": {
						backgroundColor: theme?.semanticColors?.listItemBackgroundHovered,
						color: theme?.semanticColors?.bodyText,
						outline: "none !important",
						boxShadow: "none !important"
					},
					"&:active": {
						color: theme?.semanticColors?.bodyText,
						textDecoration: "none"
					},
					"&:hover": {
						color: theme?.semanticColors?.bodyText,
						textDecoration: "none"
					},
					"&:active:hover": {
						color: theme?.semanticColors?.bodyText,
						textDecoration: "none"
					}
				}
			}
		}
	};
};
