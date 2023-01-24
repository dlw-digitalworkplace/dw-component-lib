import { IStyle, IStyleFunctionOrObject, ITheme } from "@fluentui/react";
import { ITermCreationResult } from "../models";

export interface ITermAdderLabels {
	fieldRequiredMessage?: string;
}

export interface ITermAdderProps {
	labels?: ITermAdderLabels;

	/**
	 * Optional class for the root TreeItem element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TreeItem element
	 */
	styles?: IStyleFunctionOrObject<ITermAdderStyleProps, ITermAdderStyles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;

	/**
	 * Callback for when the save button is clicked
	 */
	onSubmit?(value?: string): void | PromiseLike<void | ITermCreationResult>;

	/**
	 * Callback for when the cancel button is clicked
	 */
	onCancel?(): void;
}

export interface ITermAdderStyleProps {
	className?: string;
	theme: ITheme;
}

export interface ITermAdderStyles {
	termAdder?: IStyle;
	textField?: IStyle;
	button?: IStyle;
	spinner?: IStyle;
}
