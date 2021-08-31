import { DisplayMode } from "@microsoft/sp-core-library";
import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";

export interface IWebPartTitleProps {
	displayMode: DisplayMode;
	hidden?: boolean;
	placeholder?: string;
	title: string;

	/**
	 * Optional class for the root TreeView element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TreeView element
	 */
	styles?: IStyleFunctionOrObject<IWebPartTitleStyleProps, IWebPartTitleStyles>;

	theme?: ITheme;

	onUpdate(value: string): void;
}

export interface IWebPartTitleStyleProps {
	className?: string;

	theme?: ITheme;
}

export interface IWebPartTitleStyles {
	root?: IStyle;
	textarea?: IStyle;
}
