/**
 * Control very much based on Material UI TreeItem control.
 * Source code at https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/TreeItem/TreeItem.js
 */

import { Icon } from "office-ui-fabric-react/lib/Icon";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import TreeViewContext from "../TreeView/TreeView.context";
import { ITreeItemProps, ITreeItemStyleProps, ITreeItemStyles } from "./TreeItem.types";

const getClassNames = classNamesFunction<ITreeItemStyleProps, ITreeItemStyles>();

export const TreeItemBase: React.FC<ITreeItemProps> = React.forwardRef<HTMLLIElement, ITreeItemProps>((props, ref) => {
	const { children, nodeId, label, disabled, iconName, onClick, onInvoke, styles, className, theme } = props;
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

				<div className={classNames.itemWrapper}>
					{iconName && (
						<div className={classNames.iconWrapper}>
							<Icon className={classNames.icon} iconName={iconName} />
						</div>
					)}

					<div className={classNames.labelWrapper}>
						<div className={classNames.label}>{label}</div>
					</div>
				</div>
			</div>

			{expanded && children && (
				<ul role={"group"} className={classNames.childNodes}>
					{children}
				</ul>
			)}
		</li>
	);
});
