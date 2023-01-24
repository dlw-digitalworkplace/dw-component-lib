import * as React from "react";
import TreeViewContext from "../TreeView/TreeView.context";

export default function useTreeItem(nodeId: string) {
	const {
		focus,
		isDisabled,
		isExpandable,
		isExpanded,
		isFocused,
		isSelected,
		multiSelect,
		selectNode,
		toggleExpansion
	} = React.useContext(TreeViewContext);

	const disabled = isDisabled ? isDisabled(nodeId) : false;
	const expandable = isExpandable ? isExpandable(nodeId) : false;
	const expanded = isExpanded ? isExpanded(nodeId) : false;
	const focused = isFocused ? isFocused(nodeId) : false;
	const selected = isSelected ? isSelected(nodeId) : false;

	const handleExpansion = (event: React.SyntheticEvent) => {
		// if (!disabled) {
		if (!focused) {
			focus(event, nodeId);
		}

		const keyEvent = event as
			| React.MouseEvent<HTMLElement>
			| React.KeyboardEvent<HTMLElement>
			| React.TouchEvent<HTMLElement>;
		const multiple = multiSelect && (keyEvent.shiftKey || keyEvent.ctrlKey || keyEvent.metaKey);

		// If already expanded and trying to toggle selection don't close
		if (expandable && !(multiple && isExpanded(nodeId))) {
			toggleExpansion(event, nodeId);
		}
		// }
	};

	const handleSelection = (event: React.SyntheticEvent) => {
		if (!disabled) {
			if (!focused) {
				focus(event, nodeId);
			}

			const keyEvent = event as
				| React.MouseEvent<HTMLElement>
				| React.KeyboardEvent<HTMLElement>
				| React.TouchEvent<HTMLElement>;
			const multiple = multiSelect && (keyEvent.shiftKey || keyEvent.ctrlKey || keyEvent.metaKey);

			if (multiple) {
				if (keyEvent.shiftKey) {
					// TODO: support shift key
				} else {
					selectNode(keyEvent, nodeId, true);
				}
			} else {
				selectNode(keyEvent, nodeId);
			}
		}
	};

	const preventSelection = (event: React.SyntheticEvent) => {
		const keyEvent = event as
			| React.MouseEvent<HTMLElement>
			| React.KeyboardEvent<HTMLElement>
			| React.TouchEvent<HTMLElement>;
		if (keyEvent.shiftKey || keyEvent.ctrlKey || keyEvent.metaKey || disabled) {
			// Prevent text selection
			event.preventDefault();
		}
	};

	return {
		disabled,
		expandable,
		expanded,
		selected,
		focused,
		handleExpansion,
		handleSelection,
		preventSelection
	};
}
