import { IRenderFunction, IStyle, IStyleFunctionOrObject, ITheme } from "@fluentui/react";
import { ITreeItemContentProps } from "./TreeItemContent";

export interface ITreeItemProps {
	/**
	 * Optional react node children to render
	 */
	children?: React.ReactNode;

	/**
	 * Actions which are available on the tree item
	 */
	actions?: ITreeItemAction[];

	disabled?: boolean;

	iconName?: string;

	id?: string;

	label?: string;

	nodeId: string;

	/**
	 * Callback fired when a the content is clicked
	 *
	 * @param {object} event The event source of the callback.
	 */
	onClick?: (event: React.SyntheticEvent) => void;

	/**
	 * Callback fired when a the node is invoked
	 *
	 * @param {object} event The event source of the callback.
	 */
	onInvoke?: (event: React.SyntheticEvent) => void;

	/**
	 * When specified it will override the default rendering of the entire node
	 */
	onRenderContent?: IRenderFunction<ITreeItemProps>;

	/**
	 * When specified it will override the default rendering of the node label
	 */
	onRenderLabel?: IRenderFunction<ITreeItemContentProps>;

	/**
	 * Optional class for the root TreeItem element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TreeItem element
	 */
	styles?: IStyleFunctionOrObject<ITreeItemStyleProps, ITreeItemStyles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;
}

export interface ITreeItemStyleProps {
	className?: string;
	theme: ITheme;
}

export interface ITreeItemStyles {
	root?: IStyle;
	children?: IStyle;
}

export interface ITreeItemAction {
	key: string;
	text: string;
	onClick?(nodeId: string): void;
}
