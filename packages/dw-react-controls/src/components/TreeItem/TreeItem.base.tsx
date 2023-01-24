/**
 * Control very much based on Material UI TreeItem control.
 * Source code at https://github.com/mui/material-ui/blob/master/packages/mui-lab/src/TreeItem/TreeItem.js
 */

import { useForkRef } from "@dlw-digitalworkplace/dw-react-utils";
import { classNamesFunction, composeRenderFunction, IRenderFunction } from "@fluentui/react";
import * as React from "react";
import { TreeViewContext } from "../TreeView";
import { DescendantProvider, IDescendant, useDescendant } from "../TreeView/descendants";
import { ITreeItemProps, ITreeItemStyleProps, ITreeItemStyles } from "./TreeItem.types";
import { TreeItemContent } from "./TreeItemContent";

const getClassNames = classNamesFunction<ITreeItemStyleProps, ITreeItemStyles>();

const ownerDocument = (element: Node | null | undefined): Document => (element && element.ownerDocument) || document;

export const TreeItemBase: React.FC<ITreeItemProps> = React.forwardRef<HTMLLIElement, ITreeItemProps>((props, ref) => {
	const {
		actions,
		children,
		disabled: disabledProp,
		iconName,
		id: idProp,
		label,
		nodeId,
		onClick,
		onInvoke,
		onRenderContent,
		onRenderLabel
	} = props;
	const { className, styles, theme } = props;

	const {
		focus,
		disabledItemsFocusable,
		isDisabled,
		isExpanded,
		isFocused,
		isSelected,
		mapFirstChar,
		registerNode,
		treeId,
		unmapFirstChar,
		unregisterNode
	} = React.useContext(TreeViewContext);

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
	const selected = isSelected ? isSelected(nodeId) : false;

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
			mapFirstChar(nodeId, label.substring(0, 1));

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

	const defaultRenderContent: IRenderFunction<ITreeItemProps> = (contentProps: ITreeItemProps) => {
		return (
			<TreeItemContent
				actions={actions}
				iconName={iconName}
				label={label}
				nodeId={nodeId}
				onClick={onClick}
				onInvoke={onInvoke}
				onRenderLabel={onRenderLabel}
			/>
		);
	};

	const renderContent = onRenderContent
		? composeRenderFunction(onRenderContent, defaultRenderContent)
		: defaultRenderContent;

	return (
		<li
			className={classNames.root}
			id={id!}
			onFocus={handleFocus}
			ref={handleRef}
			role={"TreeItem"}
			aria-expanded={expandable ? expanded : undefined}
			aria-selected={selected}
		>
			{renderContent(props)}

			{expanded && children && (
				<DescendantProvider id={nodeId}>
					<ul role="group" className={classNames.children}>
						{children}
					</ul>
				</DescendantProvider>
			)}
		</li>
	);
});
