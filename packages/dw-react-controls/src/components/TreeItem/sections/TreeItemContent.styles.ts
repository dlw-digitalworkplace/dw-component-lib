import { ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const GlobalClassNames = {
	itemWrapper: "dw-TreeNodeItemWrapper",
	labelWrapper: "dw-TreeNodeLabelWrapper",
	label: "dw-TreeNodeLabel",
	iconWrapper: "dw-TreeNodeIconWrapper",
	icon: "dw-TreeNodeIcon"
};

export const getStyles = (props: ITreeItemContentStyleProps): ITreeItemContentStyles => {
	const { selected, className, theme } = props;
	const classNames = GlobalClassNames;

	return {
		itemWrapper: [
			className,
			classNames.itemWrapper,
			{
				display: "flex",
				alignItems: "center",
				boxSizing: "border-box"
			},
			selected && {
				backgroundColor: theme.palette.themeLight,
				// borderRadius: "3px"
				border: `1px solid ${theme.palette.themePrimary}`,
				marginLeft: "-1px"
			}
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
