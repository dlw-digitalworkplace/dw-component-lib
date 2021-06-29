import { ILabelProps } from "office-ui-fabric-react/lib/Label";
import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { ITermValue } from "../TermPicker";
import { ITaxonomyProvider } from "./models";
import { ITaxonomyPickerDialogProps } from "./TaxonomyPickerDialog.types";

export interface ITaxonomyPickerProps {
	allowAddingTerms?: boolean;

	allowDeprecatedTerms?: boolean;

	allowDisabledTerms?: boolean;

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

	theme?: ITheme;

	onChange(items: ITermValue[]): void;

	/**
	 * When specified, allows to override the error message that is being set.
	 * This allows you to display a different message - or none at all - when an error is returned.
	 * @param err The current error that is being thrown.
	 */
	onGetErrorMessage?(err: string): string | JSX.Element;

	/**
	 * When specified, allows to override the success message that is being set.
	 * This allows you to display a different message - or none at all - when a new term has been created.
	 * @param message The current message that is being returned.
	 * @param newValue The name of the term that has been added.
	 */
	onGetSuccessMessage?(message: string, newValue: string): string | JSX.Element;
}

export interface ITaxonomyPickerStyleProps {
	className?: string;
	theme: ITheme;
}

export interface ITaxonomyPickerStyles {
	taxonomyPicker?: IStyle;
	inputWrapper?: IStyle;
	input?: IStyle;
	errorMessage?: IStyle;
	successMessage?: IStyle;
}
