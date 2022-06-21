import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { ITreeItemAction } from "../TreeItem";

export interface ITreeItem2Props {
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
	 * Optional class for the root TreeItem element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TreeItem element
	 */
	styles?: IStyleFunctionOrObject<ITreeItem2StyleProps, ITreeItem2Styles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;
}

export interface ITreeItem2StyleProps {
	className?: string;
	theme: ITheme;
}

export interface ITreeItem2Styles {
	root?: IStyle;
	children?: IStyle;
}
