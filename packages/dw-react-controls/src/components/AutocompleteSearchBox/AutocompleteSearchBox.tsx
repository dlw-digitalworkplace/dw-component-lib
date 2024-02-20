import { styled } from "@fluentui/react/lib/Utilities";
import { getStyles } from "./AutocompleteSearchbox.styles";
import { AutocompleteSearchBoxBase } from "./AutocompleteSearchbox.base";
import { IAutocompleteSearchBoxProps, IAutocompleteSearchBoxStyleProps, IAutocompleteSearchBoxStyles } from "./AutocompleteSearchBox.types";

export const AutocompleteSearchBox: React.FC<IAutocompleteSearchBoxProps> = styled<
	IAutocompleteSearchBoxProps,
	IAutocompleteSearchBoxStyleProps,
	IAutocompleteSearchBoxStyles>(AutocompleteSearchBoxBase, getStyles);
