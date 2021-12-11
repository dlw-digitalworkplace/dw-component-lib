import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { IUser, IGroup } from "../../models";

export interface IPeoplePickerItemSuggestionProps extends React.AllHTMLAttributes<HTMLElement> {
	/**
	 * The object containing the group or user data
	 */
	item: IUser | IGroup;

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
