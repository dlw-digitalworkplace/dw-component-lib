import {
	IBasePickerProps,
	IBasePickerStyleProps,
	IBasePickerStyles
} from "office-ui-fabric-react/lib/components/pickers/BasePicker.types";
import { ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { IGroup, IUser } from "../models";

export interface IUserOrGroupPickerProps extends IBasePickerProps<IGroup | IUser> {
	/**
	 * Optional class for the root UserOrGroupPicker element.
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the UserOrGroupPicker element.
	 */
	styles?: IStyleFunctionOrObject<IUserOrGroupPickerStyleProps, IUserOrGroupPickerStyles>;

	/**
	 * The current theme applied to the control.
	 */
	theme?: ITheme;

	/**
	 * An optional function to override the rendering of the suggestion items
	 */
	onRenderSuggestion?(item: (IUser | IGroup)): JSX.Element;
}

export interface IUserOrGroupPickerStyleProps extends IBasePickerStyleProps {
	styles?: IStyleFunctionOrObject<IUserOrGroupPickerStyleProps, IUserOrGroupPickerStyles>;
}

export interface IUserOrGroupPickerStyles extends IBasePickerStyles { }
