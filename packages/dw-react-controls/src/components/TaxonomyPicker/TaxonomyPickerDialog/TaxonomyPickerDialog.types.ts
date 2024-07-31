import { IDialogProps, IRenderFunction, IStyle, IStyleFunctionOrObject, ITheme } from "@fluentui/react";
import { ITermPickerProps, ITermValue } from "../../TermPicker";
import { ITreeItemProps } from "../../TreeItem";
import { ITermAdderLabels } from "../TermAdder";
import { ITaxonomyProvider, ITerm, ITermCreationResult } from "../models";

export interface ITaxonomyPickerDialogLabels {
	addButton?: string;
	addNewTermAction?: string;
	cancelButton?: string;
	okButton?: string;
	replaceButton?: string;
	termAdderLabels?: ITermAdderLabels;
}

interface ITaxonomyPickerDialogPropsBase {
	allowAddingTerms?: boolean;

	defaultSelectedItems?: ITermValue[];

	itemLimit?: number;

	labels?: ITaxonomyPickerDialogLabels;

	pickerProps: ITermPickerProps;

	provider: ITaxonomyProvider;

	rootNodeLabel?: string;

	showRootNode?: boolean;

	trimDeprecatedTerms?: boolean;

	trimUnavailableTerms?: boolean;

	onConfirm?(terms?: ITermValue[]): void;

	onCreateNewTerm?(newValue: string, parentId?: string): PromiseLike<void | ITermCreationResult>;

	/**
	 * When specified it will override the default rendering of the tree items
	 */
	onRenderTreeItem?: IRenderFunction<ITreeItemProps & { term?: ITerm }>;

	/**
	 * Call to apply custom styling on the TaxonomyPicker element
	 */
	styles?: IStyleFunctionOrObject<ITaxonomyPickerDialogStyleProps, ITaxonomyPickerDialogStyles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;
}

export type ITaxonomyPickerDialogProps = ITaxonomyPickerDialogPropsBase & IDialogProps;

export interface ITaxonomyPickerDialogStyleProps {
	className?: string;
	contentClassName?: string;
	theme: ITheme;
}

export interface ITaxonomyPickerDialogStyles {
	dialog?: IStyle;
	actions?: IStyle;
	addButton?: IStyle;
	content?: IStyle;
	inputsContainer?: IStyle;
	picker?: IStyle;
	treeContainer?: IStyle;
}
