import { IHighlightedSuggestionStyleProps, IHighlightedSuggestionStyles } from "./HighlightedSuggestion.types";

const GlobalClassNames = {
	root: "dw-HighlightedSuggestion-root",
	rootHighlighted: "dw-HighlightedSuggestion-rootHighlighted"
};

export const getStyles = (props: IHighlightedSuggestionStyleProps): IHighlightedSuggestionStyles => {
	const { className } = props;
	const classNames = GlobalClassNames;

	return {
		root: [classNames.root, {}, className],
		rootHighlighted: [classNames.rootHighlighted, { fontWeight: "bold" }, className]
	};
};
