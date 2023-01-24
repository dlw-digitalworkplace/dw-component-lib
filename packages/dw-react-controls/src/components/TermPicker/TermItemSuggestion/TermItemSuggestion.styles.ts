import { getGlobalClassNames } from "@fluentui/react";
import { ITermItemSuggestionStyleProps, ITermItemSuggestionStyles } from "./TermItemSuggestion.types";

const GlobalClassNames = {
	root: "dw-TermSuggestion"
};

export function getStyles(props: ITermItemSuggestionStyleProps): ITermItemSuggestionStyles {
	const { className, theme } = props;

	const classNames = getGlobalClassNames(GlobalClassNames, theme);

	return {
		root: [
			classNames.root,
			{
				maxWidth: "60vw",
				padding: "6px 12px 7px",
				textAlign: "left",
				selectors: {
					"> div": {
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap"
					}
				}
			},
			className
		]
	};
}
