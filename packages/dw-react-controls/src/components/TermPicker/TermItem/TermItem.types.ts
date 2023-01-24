import { IPickerItemProps, IStyle, IStyleFunctionOrObject, ITheme } from "@fluentui/react";
import { ITermValue } from "../models";

export interface ITermItemProps extends IPickerItemProps<ITermValue> {
	/**
	 * Enable or disable focus on TermItem when TermPicker is disabled.
	 * @defaultvalue false
	 */
	enableTagFocusInDisabledPicker?: boolean;

	/**
	 * Optional class for the root TaxonomyPicker element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TaxonomyPicker element
	 */
	styles?: IStyleFunctionOrObject<ITermItemStyleProps, ITermItemStyles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;
}

export interface ITermItemStyleProps {
	className?: string;
	selected?: boolean;
	disabled?: boolean;
	theme: ITheme;
}

export interface ITermItemStyles {
	termItem: IStyle;
	text: IStyle;
	close: IStyle;
}
