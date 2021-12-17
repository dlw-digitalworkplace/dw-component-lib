import { getGlobalClassNames } from "office-ui-fabric-react/lib/Styling";
import { IPeoplePickerItemSuggestionStyleProps, IPeoplePickerItemSuggestionStyles } from "./PickerItemSuggestion.types";

const GlobalClassNames = {
	root: "dw-PeoplePickerSuggestion"
};

export function getStyles(props: IPeoplePickerItemSuggestionStyleProps): IPeoplePickerItemSuggestionStyles {
	const { className, theme } = props;

	const classNames = getGlobalClassNames(GlobalClassNames, theme);

	return {
		root: [
			classNames.root,
			{
				maxWidth: "60vw",
				padding: "3px 6px 3px",
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
