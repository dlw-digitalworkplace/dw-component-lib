import { Icon } from "office-ui-fabric-react";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { TreeItemLabel } from "../TreeItemLabel";
import useTreeItem from "../useTreeItem";
import { ITreeItemContentProps, ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const getClassNames = classNamesFunction<ITreeItemContentStyleProps, ITreeItemContentStyles>();

export const TreeItemContentBase: React.FC<ITreeItemContentProps> = React.forwardRef<
	HTMLDivElement,
	ITreeItemContentProps
>((props, ref) => {
	const { label, nodeId, onClick, onMouseDown } = props;
	const { expandable, expanded, focused, handleExpansion, handleSelection, preventSelection, selected } = useTreeItem(
		nodeId
	);

	const { styles, className, theme } = props;
	const classNames = getClassNames(styles, { className, focused, selected, theme: theme! });

	const handleClick = (event: React.SyntheticEvent) => {
		// handleExpansion(event);
		handleSelection(event);

		if (onClick) {
			onClick(event);
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

	return (
		<div className={classNames.root} ref={ref} onClick={handleClick} onMouseDown={handleMouseDown}>
			<div className={classNames.expandIcon}>
				{expandable && (
					<Icon
						className={""}
						iconName={expanded ? "ChevronDownSmall" : "ChevronRightSmall"}
						onClick={handleExpandIconClick}
						onDoubleClick={handleExpandIconDoubleClick}
					/>
				)}
			</div>

			<TreeItemLabel>{label}</TreeItemLabel>
		</div>
	);
});
