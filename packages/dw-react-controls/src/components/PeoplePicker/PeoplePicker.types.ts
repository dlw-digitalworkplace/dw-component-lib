import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { IGroup } from "./models/IGroup";
import { IPeoplePickerProvider } from "./models/IPeoplePickerProvider";
import { IUser } from "./models/IUser";

export interface IPeoplePickerProps {
	/**
	 * The people picker provider that should handle the data layer functionalities
	 */
	provider: IPeoplePickerProvider

	/**
	 * The people picker provider that should handle the data layer functionalities
	 */
	selectedItems: (IUser | IGroup)[];

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
	successMessage?: IStyle;
}
