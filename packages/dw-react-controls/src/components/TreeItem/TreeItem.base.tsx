/**
 * Control very much based on Material UI TreeItem control.
 * Source code at https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/TreeItem/TreeItem.js
 */

import { Icon } from "office-ui-fabric-react/lib/Icon";
import { classNamesFunction, IRenderFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import TreeViewContext from "../TreeView/TreeView.context";
import { TreeItemContent } from "./sections/TreeItemContent";
import { ITreeItemContentProps } from "./sections/TreeItemContent.types";
import { ITreeItemProps, ITreeItemStyleProps, ITreeItemStyles } from "./TreeItem.types";

const getClassNames = classNamesFunction<ITreeItemStyleProps, ITreeItemStyles>();

export const TreeItemBase: React.FC<ITreeItemProps> = React.forwardRef<HTMLLIElement, ITreeItemProps>((props, ref) => {
	const {
		children,
		nodeId,
		label,
		disabled,
		iconName,
		onClick,
		onInvoke,
		onRenderItemContents,
		styles,
		className,
		theme
	} = props;
	const { isExpanded, isSelected, selectNode, toggleExpansion } = React.useContext(TreeViewContext);

	const isExpandable = Array.isArray(children) ? !!children.length : !!children;
	const expanded = isExpanded(nodeId);
	const selected = isSelected(nodeId);

	const handleExpandIconClick = (event: React.MouseEvent<HTMLElement>): void => {
		event.stopPropagation();

		if (isExpandable) {
			toggleExpansion(event, nodeId);
		}
	};

	const handleExpandIconDoubleClick = (event: React.MouseEvent<HTMLElement>): void => {
		event.stopPropagation();
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
		if (!disabled) {
			selectNode(event, nodeId);
		}

		if (onClick) {
			onClick(event);
		}
	};

	const handleDoubleClick = (event: React.MouseEvent<HTMLElement>): void => {
		if (onInvoke) {
			onInvoke(event);
		}
	};

	const classNames = getClassNames(styles, { className, disabled, expanded, selected, theme: theme! });

	const renderItemContents: IRenderFunction<ITreeItemContentProps> = (props: ITreeItemContentProps) => {
		return <TreeItemContent {...props} />;
	};

	const composeRenderFunction = (
		outer: IRenderFunction<ITreeItemContentProps>,
		inner: IRenderFunction<ITreeItemContentProps>
	): IRenderFunction<ITreeItemContentProps> => {
		return (outerProps?: ITreeItemContentProps, defaultRender?: IRenderFunction<ITreeItemContentProps>) => {
			return outer(outerProps, defaultRender ? defaultRender : inner);
		};
	};

	const finalOnRenderItemContents = onRenderItemContents
		? composeRenderFunction(onRenderItemContents, renderItemContents)
		: renderItemContents;

	return (
		<li
			ref={ref}
			role={"treeitem"}
			className={classNames.treeItem}
			aria-expanded={isExpandable ? expanded : undefined}
			aria-selected={selected}
		>
			<div className={classNames.treeNode} onClick={handleClick} onDoubleClick={handleDoubleClick}>
				<div className={classNames.expandIconWrapper}>
					{isExpandable && (
						<Icon
							className={classNames.expandIcon}
							iconName={expanded ? "ChevronDownSmall" : "ChevronRightSmall"}
							onClick={handleExpandIconClick}
							onDoubleClick={handleExpandIconDoubleClick}
						/>
					)}
				</div>

				{finalOnRenderItemContents({ disabled, selected, expanded, label, iconName })}
			</div>

			{expanded && children && (
				<ul role={"group"} className={classNames.childNodes}>
					{children}
				</ul>
			)}
		</li>
	);
});
