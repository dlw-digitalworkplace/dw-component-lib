import { Icon } from "office-ui-fabric-react";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import useTreeItem from "../useTreeItem";
import { ITreeItemContentProps, ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const getClassNames = classNamesFunction<ITreeItemContentStyleProps, ITreeItemContentStyles>();

export const TreeItemContentBase: React.FC<ITreeItemContentProps> = React.forwardRef<
	HTMLDivElement,
	ITreeItemContentProps
>((props, ref) => {
	const { iconName, label, nodeId, onClick, onMouseDown } = props;
	const {
		disabled,
		expandable,
		expanded,
		focused,
		handleExpansion,
		handleSelection,
		preventSelection,
		selected
	} = useTreeItem(nodeId);

	const { styles, className, theme } = props;
	const classNames = getClassNames(styles, { className, disabled, expandable, focused, selected, theme: theme! });

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

	const renderLabel = (): JSX.Element => {
		return (
			<div className={classNames.labelWrapper}>
				{iconName && <Icon iconName={iconName} />}
				<div className={classNames.label}>{label}</div>
			</div>
		);
	};

	return (
		<div className={classNames.root} ref={ref} onClick={handleClick} onMouseDown={handleMouseDown}>
			<div className={classNames.expandIcon}>
				{expandable && (
					<Icon
						iconName={expanded ? "ChevronDownSmall" : "ChevronRightSmall"}
						onClick={handleExpandIconClick}
						onDoubleClick={handleExpandIconDoubleClick}
					/>
				)}
			</div>

			{renderLabel()}
		</div>
	);
});
