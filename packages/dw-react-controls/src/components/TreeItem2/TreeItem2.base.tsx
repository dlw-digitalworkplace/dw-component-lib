/**
 * Control very much based on Material UI TreeItem control.
 * Source code at https://github.com/mui/material-ui/blob/master/packages/mui-lab/src/TreeItem/TreeItem.js
 */

import { useForkRef } from "@dlw-digitalworkplace/dw-react-utils";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { TreeView2Context } from "../TreeView2";
import { DescendantProvider, IDescendant, useDescendant } from "../TreeView2/descendants";
import { ITreeItem2Props, ITreeItem2StyleProps, ITreeItem2Styles } from "./TreeItem2.types";
import { TreeItemContent } from "./TreeItemContent";

const getClassNames = classNamesFunction<ITreeItem2StyleProps, ITreeItem2Styles>();

const ownerDocument = (element: Node | null | undefined): Document => (element && element.ownerDocument) || document;

export const TreeItem2Base: React.FC<ITreeItem2Props> = React.forwardRef<HTMLLIElement, ITreeItem2Props>(
	(props, ref) => {
		const { children, disabled: disabledProp, id: idProp, label, nodeId, className, styles, theme } = props;

		const {
			focus,
			disabledItemsFocusable,
			isDisabled,
			isExpanded,
			isFocused,
			// isSelected,
			mapFirstChar,
			registerNode,
			treeId,
			unmapFirstChar,
			unregisterNode
		} = React.useContext(TreeView2Context);

		let id = null;

		if (!!idProp) {
			id = idProp;
		} else if (treeId && nodeId) {
			id = `${treeId}-${nodeId}`;
		}

		const classNames = getClassNames(styles, { className, theme: theme! });

		const [treeItemElement, setTreeItemElement] = React.useState<HTMLLIElement | null>(null);
		const handleRef = useForkRef(setTreeItemElement, ref);

		const descendant = React.useMemo<IDescendant>(
			() => ({
				element: treeItemElement,
				id: nodeId
			}),
			[nodeId, treeItemElement]
		);
		const { index, parentId } = useDescendant(descendant);

		const disabled = isDisabled ? isDisabled(nodeId) : false;
		const expandable = Array.isArray(children) ? children.length > 0 : !!children;
		const expanded = isExpanded ? isExpanded(nodeId) : false;
		const focused = isFocused ? isFocused(nodeId) : false;
		// const selected = isSelected ? isSelected(nodeId) : false;

		React.useEffect(() => {
			if (index !== -1) {
				registerNode({
					id: nodeId,
					index,
					parentId,
					expandable,
					disabled: !!disabledProp
				});

				return () => unregisterNode(nodeId);
			}

			return undefined;
		}, [registerNode, unregisterNode, parentId, index, nodeId, expandable]);

		React.useEffect(() => {
			if (!!label) {
				mapFirstChar(nodeId, label);

				return () => {
					unmapFirstChar(nodeId);
				};
			}
			return undefined;
		}, [mapFirstChar, unmapFirstChar, nodeId, label]);

		const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
			if (event.target === event.currentTarget) {
				ownerDocument(event.target).getElementById(treeId)?.focus({ preventScroll: true });
			}

			const unfocusable = !disabledItemsFocusable && disabled;
			if (!focused && event.target === event.currentTarget && !unfocusable) {
				focus(event, nodeId);
			}
		};

		return (
			<li className={classNames.root} id={id!} onFocus={handleFocus} ref={handleRef} role={"TreeItem2"}>
				<TreeItemContent label={label} nodeId={nodeId} />

				{expanded && children && (
					<DescendantProvider id={nodeId}>
						<ul role="group">{children}</ul>
					</DescendantProvider>
				)}
			</li>
		);
	}
);
