import { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";

export interface IHighlightedSuggestionProps {
	className?: string;
	theme?: ITheme;
	styles?: IStyleFunctionOrObject<IHighlightedSuggestionStyleProps, IHighlightedSuggestionStyles>;

	/**
	 * The text to highlight.
	 */
	text: string;

	/**
	 * The filter to highlight in the text.
	 */
	filter: string;
}

export interface IHighlightedSuggestionStyles {
	root?: IStyle;
	rootHighlighted?: IStyle;
}

export interface IHighlightedSuggestionStyleProps {
	className?: string;
	theme?: ITheme;
}
