import { styled } from "@fluentui/react/lib/Utilities";
import { IHighlightedSuggestionProps, IHighlightedSuggestionStyleProps, IHighlightedSuggestionStyles } from "./HighlightedSuggestion.types";
import { HighlightedSuggestionBase } from "./HighlightedSuggestion.base";
import { getStyles } from "./HighlightedSuggestion.styles";

export const HighlightedSuggestion: React.FC<IHighlightedSuggestionProps> = styled<
	IHighlightedSuggestionProps,
	IHighlightedSuggestionStyleProps,
	IHighlightedSuggestionStyles>(HighlightedSuggestionBase, getStyles);
