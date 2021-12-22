import { ILabelProps } from "office-ui-fabric-react/lib/Label";
import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { GroupType } from "./models/GroupType";
import { IGroup } from "./models/IGroup";
import { IPeoplePickerProvider } from "./models/IPeoplePickerProvider";
import { IUser } from "./models/IUser";
import { SearchType } from "./models/SearchType";

export interface IPeoplePickerProps {
	/**
	 * The people picker provider that should handle the data layer functionalities
	 */
	provider: IPeoplePickerProvider

	/**
	 * An array of selected users or groups
	 */
	selectedItems: (IUser | IGroup)[];

	/**
	 * Required parameter to indicate what types of data will be visible (user, groups, both)
	 */
	 searchFor: SearchType;

	/**
	 * Optional parameter to limit the amount of options that can be slected
	 */
	itemLimit?: number;

	/**
	 * Optional parameter to render a label
	 */
	label?: string;

	/**
	 * Optional parameter to disable the component
	 */
	disabled?: boolean;

	/**
	 * Optional parameter to indicate that the value is required
	 */
	required?: boolean;

	/**
	 * Optional object to set the label props
	 */
	labelProps?: Partial<ILabelProps>;

	/**
	 * Optional parameter to provide an error message to the component
	 */
	errorMessage?: string | JSX.Element;

	/**
	 * In case of groups, indicate which group types (AAD, M365, SPO)
	 */
	groupTypes?: GroupType[];

	/**
	 * Call to apply custom styling on the People Picker element
	 */
	styles?: IStyleFunctionOrObject<IPeoplePickerStyleProps, IPeoplePickerStyles>;
	/**
	* Optional class for the root Peple Picker element
	*/
	className?: string;
	/**
	 * Optional theme to provide to the people picker
	 */
	theme?: ITheme;

	/**
	 * onChange event that is triggered when the selection of the people picker changes
	 * @param items List of the selected users and groups
	 */
	onChange(items: (IUser | IGroup)[]): void;

	/**
	 * An optional function to override the rendering of the suggestion items
	 * @param item The user or group to render
	 * @returns An element to render
	 */
	onRenderSuggestion?(item: (IUser | IGroup)): JSX.Element;
}

export interface IPeoplePickerStyleProps {
	className?: string;
	theme: ITheme;
}

export interface IPeoplePickerStyles {
	root?: IStyle;
	inputWrapper?: IStyle;
	input?: IStyle;
	errorMessage?: IStyle;
}
