/**
 * Control very much based on Material UI TreeView control.
 * Source code at https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/TreeView/TreeView.js
 */

import { useControlled, useForkRef } from "@dlw-digitalworkplace/dw-react-utils";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import useId from "../../utilities/useId";
import { DescendantProvider } from "./descendants";
import TreeView2Context from "./TreeView2.context";
import { ITreeView2StyleProps, ITreeView2Styles, ITreeViewNode, TreeView2Props } from "./TreeView2.types";

const getClassNames = classNamesFunction<ITreeView2StyleProps, ITreeView2Styles>();

const ownerDocument = (element: Node | null | undefined): Document => (element && element.ownerDocument) || document;

export const TreeView2Base: React.FC<TreeView2Props> = React.forwardRef<HTMLUListElement, TreeView2Props>(
	(props, ref) => {
		const {
			children,
			defaultExpanded,
			defaultSelected,
			disabledItemsFocusable = false,
			disableSelection = false,
			expanded: expandedProp,
			id: idProp,
			multiSelect,
			onKeyDown,
			onNodeFocus,
			onNodeSelect,
			onNodeToggle,
			selected: selectedProp
		} = props;

		const { className, styles } = props;
		const classNames = getClassNames(styles, { className });

		const isRtl = document.body.dir === "rtl";

		const [expanded, setExpanded] = useControlled(expandedProp, defaultExpanded, "TreeView2");
		const [selected, setSelected] = useControlled(selectedProp, defaultSelected, "TreeView2");

		const nodeMap = React.useRef<{ [key: string]: ITreeViewNode }>({});
		const firstCharMap = React.useRef<{ [key: string]: string }>({});

		const treeRef = React.useRef<HTMLUListElement | null>(null);
		const handleRef = useForkRef(treeRef, ref);

		const [focusedNodeId, setFocusedNodeId] = React.useState<string | null>(null);

		const treeId = useId(idProp);

		/* Status helpers */

		const isDisabled = React.useCallback((nodeId: string) => {
			let node = nodeMap.current[nodeId];

			if (!node) {
				return false;
			}

			if (node.disabled) {
				return true;
			}

			while (!!node.parentId) {
				node = nodeMap.current[node.parentId];

				if (node.disabled) {
					return true;
				}
			}

			return false;
		}, []);

		const isExpandable = React.useCallback(
			(nodeId: string) => nodeMap.current[nodeId] && !!nodeMap.current[nodeId].expandable,
			[]
		);

		const isExpanded = React.useCallback(
			(nodeId: string) => (Array.isArray(expanded) ? expanded.indexOf(nodeId) !== -1 : false),
			[expanded]
		);

		const isFocused = (nodeId: string) => focusedNodeId === nodeId;

		const isSelected = React.useCallback(
			(nodeId: string) => (Array.isArray(selected) ? selected.indexOf(nodeId) !== -1 : selected === nodeId),
			[selected]
		);

		/* Child helpers */

		const getChildrenIds = (nodeId: string | null): string[] =>
			Object.keys(nodeMap.current)
				.map((key) => nodeMap.current[key])
				.filter((node) => node.parentId === nodeId)
				.sort((a, b) => a.index - b.index)
				.map((child) => child.id);

		const getNavigableChildrenIds = (nodeId: string | null): string[] => {
			let childrenIds = getChildrenIds(nodeId);

			if (!disabledItemsFocusable) {
				childrenIds = childrenIds.filter((node) => !isDisabled(node));
			}

			return childrenIds;
		};

		/* Node helpers */

		const getNextNode = (nodeId: string): string | null => {
			let navigableChildrenIds;
			if (isExpanded(nodeId) && (navigableChildrenIds = getNavigableChildrenIds(nodeId)).length > 0) {
				return navigableChildrenIds[0];
			}

			let node: ITreeViewNode | null = nodeMap.current[nodeId];
			while (node !== null) {
				const siblings = getNavigableChildrenIds(node.parentId);
				const nextSibling = siblings[siblings.indexOf(node.id) + 1];

				if (!!nextSibling) {
					return nextSibling;
				}

				node = node.parentId !== null ? nodeMap.current[node.parentId] : null;
			}

			return null;
		};

		const getPreviousNode = (nodeId: string): string | null => {
			const node = nodeMap.current[nodeId];
			const siblings = getNavigableChildrenIds(node.parentId);
			const nodeIndex = siblings.indexOf(nodeId);

			if (nodeIndex === 0) {
				return node.parentId;
			}

			let currentNode: string | null = siblings[nodeIndex - 1];
			while (!!currentNode && isExpanded(currentNode) && getNavigableChildrenIds(currentNode).length > 0) {
				currentNode = getNavigableChildrenIds(currentNode).pop() || null;
			}

			return currentNode;
		};

		const getLastNode = (): string | null => {
			let lastNode = getNavigableChildrenIds(null).pop() || null;

			while (lastNode && isExpanded(lastNode)) {
				lastNode = getNavigableChildrenIds(lastNode).pop() || null;
			}
			return lastNode;
		};

		const getFirstNode = () => getNavigableChildrenIds(null)[0];
		const getParent = (nodeId: string) => nodeMap.current[nodeId].parentId;

		/**
		 * This is used to determine the start and end of a selection range so
		 * we can get the nodes between the two border nodes.
		 *
		 * It finds the nodes' common ancestor using
		 * a naive implementation of a lowest common ancestor algorithm
		 * (https://en.wikipedia.org/wiki/Lowest_common_ancestor).
		 * Then compares the ancestor's 2 children that are ancestors of nodeA and NodeB
		 * so we can compare their indexes to work out which node comes first in a depth first search.
		 * (https://en.wikipedia.org/wiki/Depth-first_search)
		 *
		 * Another way to put it is which node is shallower in a trémaux tree
		 * https://en.wikipedia.org/wiki/Tr%C3%A9maux_tree
		 */
		const findOrderInTremauxTree = (nodeAId: string, nodeBId: string) => {
			if (nodeAId === nodeBId) {
				return [nodeAId, nodeBId];
			}

			const nodeA = nodeMap.current[nodeAId];
			const nodeB = nodeMap.current[nodeBId];

			if (nodeA.parentId === nodeB.id || nodeB.parentId === nodeA.id) {
				return nodeB.parentId === nodeA.id ? [nodeA.id, nodeB.id] : [nodeB.id, nodeA.id];
			}

			const aFamily = [nodeA.id];
			const bFamily = [nodeB.id];

			let aAncestor = nodeA.parentId;
			let bAncestor = nodeB.parentId;

			let aAncestorIsCommon = !aAncestor || bFamily.indexOf(aAncestor) !== -1;
			let bAncestorIsCommon = !bAncestor || aFamily.indexOf(bAncestor) !== -1;

			let continueA = true;
			let continueB = true;

			while (!bAncestorIsCommon && !aAncestorIsCommon) {
				if (continueA) {
					aFamily.push(aAncestor!);
					aAncestorIsCommon = bFamily.indexOf(aAncestor!) !== -1;
					continueA = aAncestor !== null;
					if (!aAncestorIsCommon && continueA) {
						aAncestor = nodeMap.current[aAncestor!].parentId;
					}
				}

				if (continueB && !aAncestorIsCommon) {
					bFamily.push(bAncestor!);
					bAncestorIsCommon = aFamily.indexOf(bAncestor!) !== -1;
					continueB = bAncestor !== null;
					if (!bAncestorIsCommon && continueB) {
						bAncestor = nodeMap.current[bAncestor!].parentId;
					}
				}
			}

			const commonAncestor = aAncestorIsCommon ? aAncestor : bAncestor;
			const ancestorFamily = getChildrenIds(commonAncestor);

			const aSide = aFamily[aFamily.indexOf(commonAncestor!) - 1];
			const bSide = bFamily[bFamily.indexOf(commonAncestor!) - 1];

			return ancestorFamily.indexOf(aSide) < ancestorFamily.indexOf(bSide) ? [nodeAId, nodeBId] : [nodeBId, nodeAId];
		};

		const getNodesInRange = (nodeA: string, nodeB: string) => {
			const [first, last] = findOrderInTremauxTree(nodeA, nodeB);
			const nodes = [first];

			let current: string | null = first;

			while (!!current && current !== last) {
				const next = getNextNode(current);
				current = next;

				if (!!next) {
					nodes.push(next);
				}
			}

			return nodes;
		};

		/* Expansion helpers */

		const toggleExpansion = (event: React.SyntheticEvent, nodeId: string = focusedNodeId!) => {
			let newExpanded: string[];

			if (expanded && expanded.indexOf(nodeId) !== -1) {
				newExpanded = expanded.filter((id) => id !== nodeId);
			} else {
				newExpanded = [nodeId, ...(expanded || [])];
			}

			if (onNodeToggle) {
				onNodeToggle(event, newExpanded);
			}

			setExpanded(newExpanded);
		};

		const expandAllSiblings = (event: React.SyntheticEvent, nodeId: string) => {
			const node = nodeMap.current[nodeId];
			const siblings = getChildrenIds(node.parentId);

			const diff = siblings.filter((child) => isExpandable(child) && !isExpanded(child));

			const newExpanded = expanded?.concat(diff) || diff;

			if (diff.length > 0) {
				setExpanded(newExpanded);

				if (onNodeToggle) {
					onNodeToggle(event, newExpanded);
				}
			}
		};

		/* Selection helpers */

		const lastSelectedNode = React.useRef<string | null>();
		const lastSelectionWasRange = React.useRef<boolean | null>(false);
		const currentRangeSelection = React.useRef<string[] | null>([]);

		const handleRangeArrowSelect = (
			event: React.SyntheticEvent,
			nodes: { current?: string | null; next: string | null; start?: string | null }
		) => {
			if (!multiSelect) {
				return;
			}

			let base: string[] = (Array.isArray(selected) && selected?.slice()) || [];
			const { current, next, start } = nodes;

			if (!next || !current) {
				return;
			}

			let currentRange = currentRangeSelection.current || [];
			if (currentRange.indexOf(current) === -1) {
				currentRange = [];
			}

			if (!!lastSelectionWasRange.current) {
				if (currentRange.indexOf(next) !== -1) {
					base = base.filter((id) => id === start || id !== current);
					currentRange = currentRange.filter((id) => id === start || id !== current) || [];
				} else {
					base.push(next);
					currentRange.push(current, next);
				}
			}

			currentRangeSelection.current = currentRange;

			if (onNodeSelect) {
				onNodeSelect(event, base);
			}

			setSelected(base);
		};

		const handleRangeSelect = (event: React.SyntheticEvent, nodes: { end: string | null; start?: string | null }) => {
			if (!multiSelect) {
				return;
			}

			let base: string[] = (Array.isArray(selected) && selected?.slice()) || [];
			const { end, start } = nodes;

			// If last selection was a range selection ignore nodes that were selected.
			if (lastSelectionWasRange.current) {
				base = base.filter((id) => (currentRangeSelection.current || []).indexOf(id) === -1);
			}

			let range = getNodesInRange(start!, end!);
			range = range.filter((node) => !isDisabled(node));
			currentRangeSelection.current = range;

			let newSelected = base.concat(range);
			newSelected = newSelected.filter((id, ix) => newSelected.indexOf(id) === ix);

			if (onNodeSelect) {
				onNodeSelect(event, newSelected);
			}

			setSelected(newSelected);
		};

		const handleMultipleSelect = (event: React.SyntheticEvent, nodeId: string) => {
			let newSelected: string[];
			const oldSelected = Array.isArray(selected) ? selected : !!selected ? [selected] : [];

			if (oldSelected.indexOf(nodeId) !== -1) {
				newSelected = oldSelected.filter((id) => id !== nodeId);
			} else {
				newSelected = [nodeId, ...oldSelected];
			}

			if (onNodeSelect) {
				onNodeSelect(event, newSelected as string[] & string);
				// cast is safe since at this point we know the tree is multiple select
			}

			setSelected(newSelected);
		};

		const handleSingleSelect = (event: React.SyntheticEvent, nodeId: string) => {
			let newSelected: string | string[];
			if (multiSelect) {
				newSelected = [nodeId];
			} else {
				newSelected = nodeId;
			}

			if (onNodeSelect) {
				onNodeSelect(event, newSelected as string[] & string);
				// cast is safe since at this point we know the tree is single select
			}

			setSelected(newSelected);
		};

		const selectNode = (event: React.SyntheticEvent, nodeId: string | null, multiple: boolean = false) => {
			if (!!nodeId) {
				if (multiple) {
					handleMultipleSelect(event, nodeId);
				} else {
					handleSingleSelect(event, nodeId);
				}

				lastSelectedNode.current = nodeId;

				return true;
			}
			return false;
		};

		const selectRange = (
			event: React.SyntheticEvent,
			nodes: { current?: string | null; end: string | null; start?: string | null },
			stacked: boolean = false
		) => {
			const { current, end, start = lastSelectedNode.current } = nodes;
			if (stacked) {
				handleRangeArrowSelect(event, { current, next: end, start });
			} else if (start !== null && end !== null) {
				handleRangeSelect(event, { end, start });
			}
			lastSelectionWasRange.current = true;
		};

		const rangeSelectToFirst = (event: React.SyntheticEvent, nodeId: string | null) => {
			if (!lastSelectedNode.current) {
				lastSelectedNode.current = nodeId;
			}

			const start = lastSelectionWasRange.current ? lastSelectedNode.current : nodeId;

			selectRange(event, {
				start,
				end: getFirstNode()
			});
		};

		const rangeSelectToLast = (event: React.SyntheticEvent, nodeId: string | null) => {
			if (!lastSelectedNode.current) {
				lastSelectedNode.current = nodeId;
			}

			const start = lastSelectionWasRange.current ? lastSelectedNode.current : nodeId;

			selectRange(event, {
				start,
				end: getLastNode()
			});
		};

		const selectNextNode = (event: React.SyntheticEvent, nodeId: string | null) => {
			if (nodeId === null) {
				return;
			}

			const nextNode = getNextNode(nodeId);
			if (nextNode !== null && !isDisabled(nextNode)) {
				selectRange(
					event,
					{
						end: nextNode,
						current: nodeId
					},
					true
				);
			}
		};

		const selectPreviousNode = (event: React.SyntheticEvent, nodeId: string | null) => {
			if (nodeId === null) {
				return;
			}

			const previousNode = getPreviousNode(nodeId);
			if (previousNode !== null && !isDisabled(previousNode)) {
				selectRange(
					event,
					{
						end: previousNode,
						current: nodeId
					},
					true
				);
			}
		};

		const selectAllNodes = (event: React.SyntheticEvent) => {
			selectRange(event, { start: getFirstNode(), end: getLastNode() });
		};

		/* Focus helpers */

		const focus = (event: React.SyntheticEvent, nodeId: string | null) => {
			if (!nodeId) {
				return;
			}

			event.persist();

			setFocusedNodeId(nodeId);

			if (onNodeFocus) {
				onNodeFocus(event, nodeId);
			}
		};

		const focusNextNode = (event: React.SyntheticEvent, nodeId: string) => focus(event, getNextNode(nodeId));
		const focusPreviousNode = (event: React.SyntheticEvent, nodeId: string) => focus(event, getPreviousNode(nodeId));
		const focusFirstNode = (event: React.SyntheticEvent) => focus(event, getFirstNode());
		const focusLastNode = (event: React.SyntheticEvent) => focus(event, getLastNode());

		/* Mapping helpers */

		const registerNode = React.useCallback((node: ITreeViewNode) => {
			const { disabled, expandable, id, index, parentId } = node;

			nodeMap.current[id] = { disabled, expandable, id, index, parentId };
		}, []);

		const unregisterNode = React.useCallback((nodeId: string) => {
			const newMap = { ...nodeMap.current };
			delete newMap[nodeId];
			nodeMap.current = newMap;

			setFocusedNodeId((prev) => {
				if (prev === nodeId && treeRef.current === ownerDocument(treeRef.current).activeElement) {
					return getChildrenIds(null)[0];
				}
				return prev;
			});
		}, []);

		const mapFirstChar = React.useCallback((nodeId: string, firstChar: string) => {
			firstCharMap.current[nodeId] = firstChar;
		}, []);

		const unmapFirstChar = React.useCallback((nodeId: string) => {
			const newMap = { ...firstCharMap.current };
			delete newMap[nodeId];
			firstCharMap.current = newMap;
		}, []);

		/* Event handlers */

		const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
			if (event.target === event.currentTarget) {
				const firstSelected = Array.isArray(selected) ? selected[0] : selected;

				if (firstSelected) {
					focus(event, firstSelected);
				}
			}
		};

		const handleNextArrow = (event: React.KeyboardEvent): boolean => {
			if (!focusedNodeId) {
				return false;
			}

			if (isExpandable(focusedNodeId)) {
				if (isExpanded(focusedNodeId)) {
					focusNextNode(event, focusedNodeId);
				} else if (!isDisabled(focusedNodeId)) {
					toggleExpansion(event);
				}
			}
			return true;
		};

		const handlePreviousArrow = (event: React.KeyboardEvent): boolean => {
			if (!focusedNodeId) {
				return false;
			}

			if (isExpanded(focusedNodeId) && !isDisabled(focusedNodeId)) {
				toggleExpansion(event, focusedNodeId);
				return true;
			}

			const parent = getParent(focusedNodeId);
			if (parent) {
				focus(event, parent);
				return true;
			}
			return false;
		};

		const handleKeyDown = (event: React.KeyboardEvent) => {
			let flag = false;
			const key = event.key;

			// If the tree is empty there will be no focused node
			if (event.altKey || event.currentTarget !== event.target || !focusedNodeId) {
				return;
			}

			const ctrlPressed = event.ctrlKey || event.metaKey;
			switch (key) {
				case " ":
					if (!disableSelection && !isDisabled(focusedNodeId)) {
						if (multiSelect && event.shiftKey) {
							selectRange(event, { end: focusedNodeId });
							flag = true;
						} else if (multiSelect) {
							flag = selectNode(event, focusedNodeId, true);
						} else {
							flag = selectNode(event, focusedNodeId);
						}
					}
					event.stopPropagation();
					break;

				case "Enter":
					if (!isDisabled(focusedNodeId)) {
						if (isExpandable(focusedNodeId)) {
							toggleExpansion(event);
							flag = true;
						} else if (multiSelect) {
							flag = selectNode(event, focusedNodeId, true);
						} else {
							flag = selectNode(event, focusedNodeId);
						}
					}
					event.stopPropagation();
					break;

				case "ArrowDown":
					if (multiSelect && event.shiftKey && !disableSelection) {
						selectNextNode(event, focusedNodeId);
					}
					focusNextNode(event, focusedNodeId);
					flag = true;
					break;

				case "ArrowUp":
					if (multiSelect && event.shiftKey && !disableSelection) {
						selectPreviousNode(event, focusedNodeId);
					}
					focusPreviousNode(event, focusedNodeId);
					flag = true;
					break;

				case "ArrowRight":
					if (isRtl) {
						flag = handlePreviousArrow(event);
					} else {
						flag = handleNextArrow(event);
					}
					break;

				case "ArrowLeft":
					if (isRtl) {
						flag = handleNextArrow(event);
					} else {
						flag = handlePreviousArrow(event);
					}
					break;

				case "Home":
					if (multiSelect && ctrlPressed && event.shiftKey && !disableSelection && !isDisabled(focusedNodeId)) {
						rangeSelectToFirst(event, focusedNodeId);
					}
					focusFirstNode(event);
					flag = true;
					break;

				case "End":
					if (multiSelect && ctrlPressed && event.shiftKey && !disableSelection && !isDisabled(focusedNodeId)) {
						rangeSelectToLast(event, focusedNodeId);
					}
					focusLastNode(event);
					flag = true;
					break;

				case "*":
					expandAllSiblings(event, focusedNodeId);
					flag = true;
					break;

				default:
					if (multiSelect && ctrlPressed && key.toLocaleLowerCase() === "a" && !disableSelection) {
						selectAllNodes(event);
						flag = true;
					}
					break;
			}

			if (flag) {
				event.preventDefault();
				event.stopPropagation();
			}

			if (onKeyDown) {
				onKeyDown(event);
			}
		};

		return (
			<TreeView2Context.Provider
				value={{
					focus,
					isDisabled,
					isExpandable,
					isExpanded,
					isFocused,
					isSelected,
					mapFirstChar,
					multiSelect,
					registerNode,
					selectNode,
					toggleExpansion,
					treeId: treeId!,
					unmapFirstChar,
					unregisterNode
				}}
			>
				<DescendantProvider>
					<ul
						ref={handleRef}
						className={classNames.TreeView2}
						id={treeId}
						onFocus={handleFocus}
						onKeyDown={handleKeyDown}
						role={"tree"}
						tabIndex={0}
					>
						{children}
					</ul>
				</DescendantProvider>
			</TreeView2Context.Provider>
		);
	}
);
