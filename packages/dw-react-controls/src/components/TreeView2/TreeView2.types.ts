import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";

interface ITreeView2PropsBase {
	/**
	 * Expanded node ids (uncontrolled)
	 */
	defaultExpanded?: string[];

	/**
	 * If `true`, will allow focus on disabled items.
	 * @default false
	 */
	disabledItemsFocusable?: boolean;

	/**
	 * If `true` selection is disabled.
	 * @default false
	 */
	disableSelection?: boolean;

	/**
	 * Expanded node ids (controlled)
	 */
	expanded?: string[];

	/**
	 * Id for the tree element
	 */
	id?: string;

	/**
	 * Expanded node ids (controlled)
	 */
	multiSelect?: boolean;

	/**
	 * Optional class for the root TreeView2 element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TreeView2 element
	 */
	styles?: IStyleFunctionOrObject<ITreeView2StyleProps, ITreeView2Styles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;

	/**
	 * Callback fired when a keyboard button is pressed.
	 *
	 * @param {object} event The event source of the callback.
	 */
	onKeyDown?(event: React.SyntheticEvent): void;

	/**
	 * Callback fired when a tree item is focused.
	 *
	 * @param {object} event The event source of the callback.
	 * @param {string} nodeId The id of the focused node.
	 */
	onNodeFocus?(event: React.SyntheticEvent, nodeId: string): void;

	/**
	 * Callback fired when a tree item is expanded/collapsed.
	 *
	 * @param {object} event The event source of the callback.
	 * @param {string[]} nodeIds The id of the expanded node.
	 */
	onNodeToggle?(event: React.SyntheticEvent, nodeIds: string[]): void;
}

export interface IMultiSelectTreeView2Props extends ITreeView2PropsBase {
	/**
	 * Selected node ids. (Uncontrolled)
	 * When `multiSelect` is true this takes an array of strings; when false (default) a string.
	 * @default []
	 */
	defaultSelected?: string[];

	/**
	 * Selected node ids. (Controlled)
	 * When `multiSelect` is true this takes an array of strings; when false (default) a string.
	 */
	selected?: string[];

	/**
	 * If true `ctrl` and `shift` will trigger multiselect.
	 * @default false
	 multiSelect: true;
	 */

	/**
	 * Callback fired when tree items are selected/unselected.
	 *
	 * @param {React.SyntheticEvent} event The event source of the callback
	 * @param {string[] | string} nodeIds Ids of the selected nodes. When `multiSelect` is true
	 * this is an array of strings; when false (default) a string.
	 */
	onNodeSelect?: (event: React.SyntheticEvent, nodeIds: string[]) => void;
}

export interface ISingleSelectTreeView2Props extends ITreeView2PropsBase {
	/**
	 * Selected node ids. (Uncontrolled)
	 * When `multiSelect` is true this takes an array of strings; when false (default) a string.
	 * @default []
	 */
	defaultSelected?: string;

	/**
	 * Selected node ids. (Controlled)
	 * When `multiSelect` is true this takes an array of strings; when false (default) a string.
	 */
	selected?: string | null;

	/**
	 * If true `ctrl` and `shift` will trigger multiselect.
	 * @default false
	 */
	multiSelect?: false;

	/**
	 * Callback fired when tree items are selected/unselected.
	 *
	 * @param {React.SyntheticEvent} event The event source of the callback
	 * @param {string[] | string} nodeIds Ids of the selected nodes. When `multiSelect` is true
	 * this is an array of strings; when false (default) a string.
	 */
	onNodeSelect?: (event: React.SyntheticEvent, nodeIds: string) => void;
}

export type TreeView2Props = IMultiSelectTreeView2Props | ISingleSelectTreeView2Props;

export interface ITreeViewNode {
	id: string;
	index: number;
	parentId: string | null;
	expandable?: boolean;
	disabled?: boolean;
}

export interface ITreeView2StyleProps {
	className?: string;
}

export interface ITreeView2Styles {
	TreeView2?: IStyle;
}
