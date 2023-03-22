import { IDialogProps, IStyle, IStyleFunctionOrObject, ITheme } from "@fluentui/react";
import { ITermPickerProps, ITermValue } from "../../TermPicker";
import { ITaxonomyProvider, ITermCreationResult } from "../models";
import { ITermAdderLabels } from "../TermAdder";

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

	allowDisabledTerms?: boolean;

	allowDeprecatedTerms?: boolean;

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
