import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";

export interface IPeoplePickerItemSuggestionProps extends React.AllHTMLAttributes<HTMLElement> {
	/**
	 * Required string to show in the title of the suggestion items
	 */
	title: string;

	/**
	 * Required string to show in the label of the suggestion items
	 */
	label: string;

	/**
	 * Optional image url
	 */
	imageUrl?: string;

	/**
	 * Optional class for the root picker suggestion element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the suggestion element
	 */
	styles?: IStyleFunctionOrObject<IPeoplePickerItemSuggestionStyleProps, IPeoplePickerItemSuggestionStyles>;

	/**
	 * Theme provided by High-Order Component
	 */
	theme?: ITheme;
}

export type IPeoplePickerItemSuggestionStyleProps = Required<Pick<IPeoplePickerItemSuggestionProps, "theme">> &
	Pick<IPeoplePickerItemSuggestionProps, "className"> & {};

export interface IPeoplePickerItemSuggestionStyles {
	root?: IStyle;
}
