import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import useTreeItem from "../useTreeItem";
import { ITreeItemContentProps, ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const getClassNames = classNamesFunction<ITreeItemContentStyleProps, ITreeItemContentStyles>();

export const TreeItemContentBase: React.FC<ITreeItemContentProps> = React.forwardRef<
	HTMLDivElement,
	ITreeItemContentProps
>((props, ref) => {
	const { label, nodeId } = props;
	const { focused, handleExpansion, handleSelection, selected } = useTreeItem(nodeId);

	const { styles, className, theme } = props;
	const classNames = getClassNames(styles, { className, focused, selected, theme: theme! });

	const handleClick = (event: React.SyntheticEvent) => {
		handleExpansion(event);
		handleSelection(event);
	};

	return (
		<div className={classNames.root} ref={ref} onClick={handleClick}>
			{label}
		</div>
	);
});
