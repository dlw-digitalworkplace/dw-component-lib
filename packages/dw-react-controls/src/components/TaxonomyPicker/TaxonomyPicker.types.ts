import { ILabelProps } from "office-ui-fabric-react/lib/Label";
import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IRenderFunction, IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
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

	dialogProps?: Pick<
		ITaxonomyPickerDialogProps,
		"labels" | "showRootNode" | "rootNodeLabel" | "styles" | "className" | "dialogContentProps"
	>;

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

	errorMessage?: string | JSX.Element;

	onRenderOpenDialogButton?: IRenderFunction<ITaxonomyPickerDialogButtonProps>;

	onChange(items: ITermValue[]): void;

	/**
	 * When specified, allows to override the error message that is being set when creating a new term fails.
	 * This allows you to display a different message - or none at all - when an error is returned.
	 * @param newValue The name of the term that was being added.
	 * @param err The current error that is being thrown.
	 */
	onReceiveTermCreationFailedMessage?(newValue: string, err: string): string | JSX.Element;

	/**
	 * When specified, allows to override the success message that is being set when successfully creating a new term.
	 * This allows you to display a different message - or none at all - when a new term has been created.
	 * @param newValue The name of the term that has been added.
	 * @param message The current message that is being returned.
	 */
	onReceiveTermCreationSuccessMessage?(newValue: string, message: string): string | JSX.Element;

	onGetErrorMessage?(selectedItems: ITermValue[]): string | JSX.Element | PromiseLike<string | JSX.Element> | undefined;
}

export interface ITaxonomyPickerStyleProps {
	className?: string;
	theme: ITheme;
}

export interface ITaxonomyPickerStyles {
	root?: IStyle;
	inputWrapper?: IStyle;
	input?: IStyle;
	errorMessage?: IStyle;
	successMessage?: IStyle;
}

export interface ITaxonomyPickerDialogButtonProps {
	disabled: boolean;
	onButtonClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>;
}
