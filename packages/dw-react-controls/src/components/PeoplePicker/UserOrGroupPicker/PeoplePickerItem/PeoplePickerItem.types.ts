import { IPickerItemProps } from "office-ui-fabric-react/lib/components/pickers/PickerItem.types";
import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { IUser, IGroup } from "../../models";

export interface IPeoplePickerItemProps extends IPickerItemProps<IUser | IGroup> {
	/**
	 * Optional class for the root picker item element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the picker item element
	 */
	styles?: IStyleFunctionOrObject<IPeoplePickerItemStyleProps, IPeoplePickerItemStyles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;
}

export interface IPeoplePickerItemStyleProps {
	className?: string;
	theme: ITheme;
}

export interface IPeoplePickerItemStyles {
	root: IStyle;
	text: IStyle;
	close: IStyle;
}
