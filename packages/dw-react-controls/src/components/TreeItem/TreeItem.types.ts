import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IRenderFunction, IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { ITreeItemContentProps } from "./sections/TreeItemContent.types";

export interface ITreeItemProps {
	/**
	 * The unique id of this tree item
	 */
	nodeId: string;

	/**
	 * The label to show for the tree item
	 */
	label: string;

	/**
	 * Actions which are available on the tree item
	 */
	actions?: ITreeItemAction[];

	/**
	 * Controls whether the tree item can be selected
	 */
	disabled?: boolean;

	/**
	 * Specifies the icon name to show with the term label
	 */
	iconName?: string;

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

	/**
	 * Optional callback when the tree node has been clicked
	 */
	onClick?(event: React.MouseEvent<HTMLElement>): void;

	/**
	 * Optional callback when the tree node has been invoked
	 */
	onInvoke?(event: React.MouseEvent<HTMLElement>): void;

	/**
	 * When specified it will override the default rendering of the TreeItemContent section
	 */
	onRenderItemContents?: IRenderFunction<ITreeItemContentProps>;
}

export interface ITreeItemStyleProps {
	className?: string;
	disabled?: boolean;
	expanded?: boolean;
	selected?: boolean;
	theme: ITheme;
}

export interface ITreeItemStyles {
	treeItem?: IStyle;
	treeNode?: IStyle;
	contextMenuIconWrapper?: IStyle;
	contextMenuIcon?: IStyle;
	expandIconWrapper?: IStyle;
	expandIcon?: IStyle;
	itemWrapper?: IStyle;
	iconWrapper?: IStyle;
	icon?: IStyle;
	labelWrapper?: IStyle;
	label?: IStyle;
	childNodes?: IStyle;
}

export interface ITreeItemAction {
	key: string;
	text: string;
	onClick?(nodeId: string): void;
}
