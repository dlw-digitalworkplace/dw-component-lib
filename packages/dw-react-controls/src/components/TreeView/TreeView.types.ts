import { IStyle } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";

export interface ITreeViewProps {
	/**
	 * Expanded node ids (uncontrolled)
	 */
	defaultExpanded?: string[];

	/**
	 * Expanded node ids (controlled)
	 */
	expanded?: string[];

	/**
	 * Selected node id (uncontrolled)
	 */
	defaultSelected?: string;

	/**
	 * Selected node id (controlled)
	 */
	selected?: string;

	/**
	 * Optional class for the root TaxonomyPicker element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TaxonomyPicker element
	 */
	styles?: IStyleFunctionOrObject<ITreeViewStyleProps, ITreeViewStyles>;

	/**
	 * Callback fired when a tree item is selected/deselected.
	 *
	 * @param {object} event The event source of the callback.
	 * @param {string} nodeId The id of the selected node.
	 */
	onNodeSelect?(event: React.ChangeEvent<{}>, nodeId?: string): void;

	/**
	 * Callback fired when a tree item is expanded/collapsed.
	 *
	 * @param {object} event The event source of the callback.
	 * @param {string[]} nodeIds The id of the expanded node.
	 */
	onNodeToggle?(event: React.ChangeEvent<{}>, nodeIds?: string[]): void;
}

export interface ITreeViewStyleProps {
	className?: string;
}

export interface ITreeViewStyles {
	treeView?: IStyle;
}
