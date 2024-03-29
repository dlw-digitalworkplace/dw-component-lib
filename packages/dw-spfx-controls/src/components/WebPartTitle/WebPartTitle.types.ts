import { IStyle, IStyleFunctionOrObject, ITheme } from "@fluentui/react";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface IWebPartTitleProps {
	displayMode: DisplayMode;
	hidden?: boolean;
	placeholder?: string;
	title: string;

	/**
	 * Optional class for the root WebPartTitle element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the WebPartTitle element
	 */
	styles?: IStyleFunctionOrObject<IWebPartTitleStyleProps, IWebPartTitleStyles>;

	theme?: ITheme;

	onRenderMoreInfoLink?(): JSX.Element;

	onUpdate(value: string): void;
}

export interface IWebPartTitleStyleProps {
	className?: string;

	theme?: ITheme;
}

export interface IWebPartTitleStyles {
	root?: IStyle;
	title?: IStyle;
	textarea?: IStyle;
	moreInfoLink?: IStyle;
}
