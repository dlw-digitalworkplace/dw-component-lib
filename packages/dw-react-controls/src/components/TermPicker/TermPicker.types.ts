import {
	IBasePickerProps,
	IBasePickerStyleProps,
	IBasePickerStyles,
	IStyleFunctionOrObject,
	ITheme
} from "@fluentui/react";
import { ITermValue } from "./models";

export interface ITermPickerProps extends IBasePickerProps<ITermValue> {
	/**
	 * Specifies if the picker is in an invalid state.
	 */
	isInvalid?: boolean;

	/**
	 * Optional class for the root TaxonomyPicker element.
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TaxonomyPicker element.
	 */
	styles?: IStyleFunctionOrObject<ITermPickerStyleProps, ITermPickerStyles>;

	/**
	 * The current theme applied to the control.
	 */
	theme?: ITheme;
}

export interface ITermPickerStyleProps extends IBasePickerStyleProps {
	isInvalid?: boolean;

	styles?: IStyleFunctionOrObject<ITermPickerStyleProps, ITermPickerStyles>;
}

export interface ITermPickerStyles extends IBasePickerStyles {}
