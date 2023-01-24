import {
	IBasePickerProps,
	IBasePickerStyleProps,
	IBasePickerStyles,
	ILabelProps,
	IPickerItemProps,
	IRenderFunction,
	IStyle,
	IStyleFunctionOrObject,
	ITheme
} from "@fluentui/react";
import { PeoplePickerValue } from "./models";
import { IGroup } from "./models/IGroup";
import { IPeoplePickerProvider } from "./models/IPeoplePickerProvider";
import { IUser } from "./models/IUser";

export interface IPeoplePickerProps
	extends Omit<
		IBasePickerProps<PeoplePickerValue>,
		"onRenderItem" | "onRenderSuggestionsItem" | "onResolveSuggestions"
	> {
	/**
	 * Optional parameter to provide an error message to the component
	 */
	errorMessage?: string | JSX.Element;

	/**
	 * Optional parameter to render a label
	 */
	label?: string;

	/**
	 * Optional object to set the label props
	 */
	labelProps?: Partial<ILabelProps>;

	/**
	 * The people picker provider that should handle the data layer functionalities
	 */
	provider: IPeoplePickerProvider;

	/**
	 * Optional parameter to indicate that the value is required
	 */
	required?: boolean;

	/**
	 * Optional class for the root Peple Picker element
	 */
	className?: string;
	/**
	 * Call to apply custom styling on the People Picker element
	 */
	styles?: IStyleFunctionOrObject<IPeoplePickerStyleProps, IPeoplePickerStyles>;

	/**
	 * An optional function to override the rendering of the selected items
	 */
	onRenderItem?: IRenderFunction<IPickerItemProps<PeoplePickerValue>>;

	/**
	 * An optional function to override the rendering of the suggestion items
	 */
	onRenderSuggestion?: IRenderFunction<IUser | IGroup>;
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

export interface IPeoplePickerInputStyleProps extends IBasePickerStyleProps {
	isInvalid?: boolean;

	styles?: IStyleFunctionOrObject<IPeoplePickerInputStyleProps, IPeoplePickerInputStyles>;
}

export interface IPeoplePickerInputStyles extends IBasePickerStyles {}
