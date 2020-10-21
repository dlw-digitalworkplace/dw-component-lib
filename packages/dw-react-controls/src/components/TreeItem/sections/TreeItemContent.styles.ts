import { ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const GlobalClassNames = {
	itemWrapper: "dw-TreeNodeItemWrapper",
	labelWrapper: "dw-TreeNodeLabelWrapper",
	label: "dw-TreeNodeLabel",
	iconWrapper: "dw-TreeNodeIconWrapper",
	icon: "dw-TreeNodeIcon"
};

export const getStyles = (props: ITreeItemContentStyleProps): ITreeItemContentStyles => {
	const { className, theme } = props;
	const classNames = GlobalClassNames;

	return {
		itemWrapper: [
			classNames.itemWrapper,
			{
				display: "flex",
				alignItems: "center",
				boxSizing: "border-box"
			},
			className
		],
		iconWrapper: [
			classNames.iconWrapper,
			{
				padding: theme.spacing.s2
			}
		],
		icon: [classNames.icon],

		labelWrapper: [
			classNames.labelWrapper,
			{
				padding: theme.spacing.s2
			}
		],
		label: [classNames.label]
	};
};
