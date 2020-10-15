import { IBasePickerProps } from "office-ui-fabric-react/lib/components/pickers/BasePicker.types";
import { ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { ITermValue } from "../../models";

export interface ITermPickerProps extends IBasePickerProps<ITermValue> {
	/**
	 * Optional class for the root TaxonomyPicker element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TaxonomyPicker element
	 */
	styles?: IStyleFunctionOrObject<ITermPickerStyleProps, ITermPickerStyles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;
}

export interface ITermPickerStyleProps {
	className?: string;
	theme: ITheme;
}

export interface ITermPickerStyles {}
