import * as React from "react";
import TreeView2Context from "../TreeView2/TreeView2.context";

export default function useTreeItem(nodeId: string) {
	const {
		focus,
		isExpanded,
		isExpandable,
		isFocused,
		isDisabled,
		isSelected,
		multiSelect,
		selectNode,
		toggleExpansion
	} = React.useContext(TreeView2Context);

	const expandable = isExpandable ? isExpandable(nodeId) : false;
	const expanded = isExpanded ? isExpanded(nodeId) : false;
	const focused = isFocused ? isFocused(nodeId) : false;
	const disabled = isDisabled ? isDisabled(nodeId) : false;
	const selected = isSelected ? isSelected(nodeId) : false;

	const handleExpansion = (event: React.SyntheticEvent) => {
		if (!disabled) {
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
		}
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
		expanded,
		selected,
		focused,
		handleExpansion,
		handleSelection,
		preventSelection
	};
}