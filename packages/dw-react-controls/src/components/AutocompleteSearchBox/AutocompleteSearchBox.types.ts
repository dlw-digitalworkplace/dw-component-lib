import { ILinkStyleProps, ILinkStyles } from "@fluentui/react";
import { ICalloutContentStyleProps, ICalloutContentStyles } from "@fluentui/react/lib/components/Callout";
import { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles } from "@fluentui/react/lib/components/SearchBox";
import { IStyle, ITheme } from "@fluentui/react/lib/Styling";
import { IStyleFunctionOrObject } from "@fluentui/react/lib/Utilities";
import {
	IHighlightedSuggestionStyleProps,
	IHighlightedSuggestionStyles
} from "./HighlightedSuggestion/HighlightedSuggestion.types";
import {
	IProgressIndicatorStyleProps,
	IProgressIndicatorStyles
} from "@fluentui/react/lib/components/ProgressIndicator";

export interface IAutocompleteSearchBoxProps extends ISearchBoxProps {
	styles?: IStyleFunctionOrObject<IAutocompleteSearchBoxStyleProps, IAutocompleteSearchBoxStyles>;
	theme?: ITheme;

	/**
	 * The callback method to resolve the suggestions for the autocomplete search box.
	 * @param searchValue The search value to resolve the suggestions for.
	 */
	onResolveSuggestions: (searchValue: string) => Promise<string[]>;

	/**
	 * The debounce time in milliseconds for the search box to start resolving the suggestions.
	 * @default 0
	 */
	debounceTime?: number;

	/**
	 * The title to display in the callout.
	 */
	calloutTitle?: string;

	/**
	 * Optional flag to enable the autocomplete suggestions highlighting.
	 * @default true
	 */
	withSuggestionHighlighting?: boolean;

	/**
	 * Optional flag to render the accessible confirmation button.
	 * @default true
	 */
	withAccessibleConfirmationButton?: boolean;

	/**
	 * The aria description for the confirmation button.
	 */
	confirmationButtonAriaDescription?: string;
}

export interface IAutocompleteSearchBoxStyleProps {
	className?: string;
	theme?: ITheme;
	hideIcon?: boolean;
}

export interface IAutocompleteSearchBoxStyles {
	root?: IStyle;
	container?: IStyle;
	confirmation?: IStyle;
	calloutProgressIndicatorPlaceholder?: IStyle;
	calloutTitle?: IStyle;
	calloutContent?: IStyle;
	suggestion?: IStyle;
	suggestionLink?: IStyle;
	subComponentStyles?: {
		searchbox?: IStyleFunctionOrObject<ISearchBoxStyleProps, ISearchBoxStyles>;
		callout?: IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles>;
		progressIndicator?: IStyleFunctionOrObject<IProgressIndicatorStyleProps, IProgressIndicatorStyles>;
		suggestionLink?: IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles>;
		highlightedSuggestion?: IStyleFunctionOrObject<IHighlightedSuggestionStyleProps, IHighlightedSuggestionStyles>;
	};
}
