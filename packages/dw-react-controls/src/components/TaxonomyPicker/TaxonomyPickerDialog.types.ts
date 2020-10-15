import { IDialogProps } from "office-ui-fabric-react/lib/Dialog";
import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { ITermValue } from "../../models";
import { ITermPickerProps } from "../TermPicker";
import { ITaxonomyProvider } from "./providers";

export interface ITaxonomyPickerDialogLabels {
	okButton?: string;
	cancelButton?: string;
	addButton?: string;
	replaceButton?: string;
}

interface ITaxonomyPickerDialogPropsBase {
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
