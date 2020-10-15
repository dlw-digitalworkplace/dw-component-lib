import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";

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
	 * Controls whether the tree item can be selected
	 */
	disabled?: boolean;

	/**
	 * Specifies the icon name to show with the term label
	 */
	iconName?: string;

	/**
	 * Optional class for the root TaxonomyPicker element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TaxonomyPicker element
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
	expandIconWrapper?: IStyle;
	expandIcon?: IStyle;
	itemWrapper?: IStyle;
	iconWrapper?: IStyle;
	icon?: IStyle;
	labelWrapper?: IStyle;
	label?: IStyle;
	childNodes?: IStyle;
}
