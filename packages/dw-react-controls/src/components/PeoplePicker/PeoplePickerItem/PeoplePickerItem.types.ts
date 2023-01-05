import { IPickerItemProps, IStyle, IStyleFunctionOrObject, ITheme } from "@fluentui/react";
import { PeoplePickerValue } from "../models";

export interface IPeoplePickerItemProps extends IPickerItemProps<PeoplePickerValue> {
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
