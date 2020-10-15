import { ILabelProps } from "office-ui-fabric-react/lib/Label";
import { IStyle } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { ITermValue } from "../../models";
import { ITaxonomyProvider } from "./providers";
import { ITaxonomyPickerDialogProps } from "./TaxonomyPickerDialog.types";

export interface ITaxonomyPickerProps {
	provider: ITaxonomyProvider;

	itemLimit?: number;

	disabled?: boolean;

	label?: string;

	labelProps?: Partial<ILabelProps>;

	dialogProps?: Partial<ITaxonomyPickerDialogProps>;

	required?: boolean;

	selectedItems: ITermValue[];

	/**
	 * Optional class for the root TaxonomyPicker element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TaxonomyPicker element
	 */
	styles?: IStyleFunctionOrObject<ITaxonomyPickerStyleProps, ITaxonomyPickerStyles>;

	onChange(items: ITermValue[]): void;
}

export interface ITaxonomyPickerStyleProps {
	className?: string;
}

export interface ITaxonomyPickerStyles {
	taxonomyPicker?: IStyle;
	inputWrapper?: IStyle;
	input?: IStyle;
}
