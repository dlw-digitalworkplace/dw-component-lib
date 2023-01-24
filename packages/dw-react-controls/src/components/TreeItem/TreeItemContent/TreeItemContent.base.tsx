import {
	classNamesFunction,
	composeRenderFunction,
	ContextualMenu,
	Icon,
	IconButton,
	IContextualMenuItem,
	IRenderFunction
} from "@fluentui/react";
import * as React from "react";
import useTreeItem from "../useTreeItem";
import { ITreeItemContentProps, ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const getClassNames = classNamesFunction<ITreeItemContentStyleProps, ITreeItemContentStyles>();

export const TreeItemContentBase: React.FC<ITreeItemContentProps> = React.forwardRef<
	HTMLDivElement,
	ITreeItemContentProps
>((props, ref) => {
	const { actions, iconName, nodeId, onClick, onInvoke, onMouseDown, onRenderLabel } = props;
	const { disabled, expandable, expanded, focused, handleExpansion, handleSelection, preventSelection, selected } =
		useTreeItem(nodeId);

	const { styles, className, theme } = props;
	const classNames = getClassNames(styles, { className, disabled, expandable, focused, selected, theme: theme! });

	const contextMenuIconRef = React.useRef<HTMLDivElement>(null);
	const [showContextMenu, setShowContextMenu] = React.useState(false);

	const handleClick = (event: React.SyntheticEvent) => {
		// handleExpansion(event);
		handleSelection(event);

		if (onClick) {
			onClick(event);
		}
	};

	const handleDoubleClick = (event: React.SyntheticEvent) => {
		handleSelection(event);

		if (onInvoke) {
			onInvoke(event);
		}
	};

	const handleExpandIconClick = (event: React.SyntheticEvent) => {
		event.stopPropagation();

		if (expandable) {
			handleExpansion(event);
		}
	};

	const handleExpandIconDoubleClick = (event: React.SyntheticEvent) => {
		event.stopPropagation();
	};

	const handleMouseDown = (event: React.SyntheticEvent) => {
		preventSelection(event);

		if (onMouseDown) {
			onMouseDown(event);
		}
	};

	const handleContextMenuButtonClick = (_: React.MouseEvent<HTMLDivElement>): void => {
		setShowContextMenu(true);
	};

	const handleHideContextMenu = (_?: React.MouseEvent | React.KeyboardEvent): void => {
		setShowContextMenu(false);
	};

	const contextMenuActions: IContextualMenuItem[] =
		actions?.map((action) => ({
			...action,
			onClick: () => (typeof action.onClick === "function" ? action.onClick(nodeId) : false)
		})) || [];

	const defaultRenderLabel: IRenderFunction<ITreeItemContentProps> = (
		contentProps: ITreeItemContentProps
	): JSX.Element => {
		const { label } = contentProps;

		return (
			<div className={classNames.labelWrapper}>
				{iconName && <Icon iconName={iconName} />}
				<div className={classNames.label}>{label}</div>
			</div>
		);
	};

	const renderLabel = onRenderLabel ? composeRenderFunction(onRenderLabel, defaultRenderLabel) : defaultRenderLabel;

	return (
		<div
			className={classNames.root}
			ref={ref}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			onMouseDown={handleMouseDown}
		>
			<div className={classNames.expandIcon}>
				{expandable && (
					<Icon
						iconName={expanded ? "ChevronDownSmall" : "ChevronRightSmall"}
						onClick={handleExpandIconClick}
						onDoubleClick={handleExpandIconDoubleClick}
					/>
				)}
			</div>

			{renderLabel(props)}

			{actions && actions.length > 0 && (
				<div ref={contextMenuIconRef}>
					{/* Wrapping element to ensure relative context menu placement */}
					<IconButton
						className={classNames.contextMenuButton}
						onClick={handleContextMenuButtonClick}
						iconProps={{ iconName: "More" }}
					/>
				</div>
			)}

			{showContextMenu && (
				<ContextualMenu
					items={contextMenuActions}
					onDismiss={handleHideContextMenu}
					target={contextMenuIconRef.current}
				/>
			)}
		</div>
	);
});
