import { IDialogProps } from "office-ui-fabric-react/lib/Dialog";
import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { ITermCreationResult, ITermValue } from "../../models";
import { ITermPickerProps } from "../TermPicker";
import { ITaxonomyProvider } from "./providers";
import { ITermAdderLabels } from "./TermAdder";

export interface ITaxonomyPickerDialogLabels {
	okButton?: string;
	cancelButton?: string;
	addButton?: string;
	replaceButton?: string;
	addNewTermAction?: string;
	termAdderLabels?: ITermAdderLabels;
}

interface ITaxonomyPickerDialogPropsBase {
	allowAddingTerms?: boolean;

	provider: ITaxonomyProvider;

	showRootNode?: boolean;

	rootNodeLabel?: string;

	defaultSelectedItems?: ITermValue[];

	pickerProps: ITermPickerProps;

	itemLimit?: number;

	labels?: ITaxonomyPickerDialogLabels;

	/**
	 * Call to apply custom styling on the TaxonomyPicker element
	 */
	styles?: IStyleFunctionOrObject<ITaxonomyPickerDialogStyleProps, ITaxonomyPickerDialogStyles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;

	onConfirm?(terms?: ITermValue[]): void;

	onCreateNewTerm?(newValue: string, parentId?: string): PromiseLike<void | ITermCreationResult>;
}

export type ITaxonomyPickerDialogProps = ITaxonomyPickerDialogPropsBase & IDialogProps;

export interface ITaxonomyPickerDialogStyleProps {
	className?: string;
	contentClassName?: string;
	theme: ITheme;
}

export interface ITaxonomyPickerDialogStyles {
	dialog?: IStyle;
	content?: IStyle;
	treeContainer?: IStyle;
	inputsContainer?: IStyle;
	addButton?: IStyle;
	picker?: IStyle;
	actions?: IStyle;
}
