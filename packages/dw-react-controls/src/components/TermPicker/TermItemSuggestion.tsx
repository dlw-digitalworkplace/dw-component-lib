import { styled } from "office-ui-fabric-react/lib/Utilities";
import { TermItemSuggestionBase } from "./TermItemSuggestion.base";
import { getStyles } from "./TermItemSuggestion.styles";
import {
	ITermItemSuggestionProps,
	ITermItemSuggestionStyleProps,
	ITermItemSuggestionStyles
} from "./TermItemSuggestion.types";

export const TermItemSuggestion = styled<
	ITermItemSuggestionProps,
	ITermItemSuggestionStyleProps,
	ITermItemSuggestionStyles
>(TermItemSuggestionBase, getStyles, undefined, {
	scope: "TermItemSuggestion"
});
