/**
 * Control very much based on Material UI TreeView control.
 * Source code at https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/TreeView/TreeView.js
 */

import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { useControlled } from "../../utils/useControlled";
import TreeViewContext from "./TreeView.context";
import { ITreeViewProps, ITreeViewStyleProps, ITreeViewStyles } from "./TreeView.types";

const getClassNames = classNamesFunction<ITreeViewStyleProps, ITreeViewStyles>();

export const TreeViewBase: React.FC<ITreeViewProps> = React.forwardRef<HTMLUListElement, ITreeViewProps>(
	(props, ref) => {
		const {
			children,
			defaultExpanded,
			expanded: expandedProp,
			defaultSelected,
			selected: selectedProp,
			onNodeSelect,
			className,
			styles
		} = props;

		const [expanded, setExpanded] = useControlled(expandedProp, defaultExpanded, "TreeView");
		const [selected, setSelected] = useControlled(selectedProp, defaultSelected, "TreeView");

		const isExpanded = React.useCallback(
			(nodeId: string) => Array.isArray(expanded) && expanded.indexOf(nodeId) !== -1,
			[expanded]
		);

		const isSelected = React.useCallback(
			(nodeId: string) => (Array.isArray(selected) ? selected.indexOf(nodeId) !== -1 : selected === nodeId),
			[selected]
		);

		const handleNodeSelection = (event: React.ChangeEvent<HTMLElement>, nodeId: string, checked?: boolean): void => {
			let newSelected: string | undefined;

			if (checked === undefined) {
				newSelected = nodeId;
			} else {
				newSelected = checked ? nodeId : undefined;
			}

			if (onNodeSelect) {
				onNodeSelect(event, newSelected);
			}

			setSelected(newSelected);
		};

		const selectNode = (event: React.ChangeEvent<HTMLElement>, nodeId: string): boolean => {
			if (!nodeId) {
				return false;
			}

			handleNodeSelection(event, nodeId);

			return true;
		};

		const toggleExpansion = (event: React.ChangeEvent<HTMLElement>, nodeId: string): void => {
			let newExpanded;
			if (expanded && expanded.indexOf(nodeId) !== -1) {
				newExpanded = expanded.filter((id) => id !== nodeId);
			} else {
				newExpanded = [nodeId, ...(expanded || [])];
			}

			setExpanded(newExpanded);
		};

		const classNames = getClassNames(styles, { className });

		return (
			<TreeViewContext.Provider
				value={{
					isExpanded,
					isSelected,
					selectNode,
					toggleExpansion
				}}
			>
				<ul ref={ref} className={classNames.treeView} role={"tree"}>
					{children}
				</ul>
			</TreeViewContext.Provider>
		);
	}
);
