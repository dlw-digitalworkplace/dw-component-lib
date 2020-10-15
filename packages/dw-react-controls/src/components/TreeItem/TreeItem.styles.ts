import { AnimationClassNames } from "office-ui-fabric-react/lib/Styling";
import { ITreeItemStyleProps, ITreeItemStyles } from "./TreeItem.types";

const GlobalClassNames = {
	treeItem: "dw-TreeItem",
	treeNode: "dw-TreeNode",
	expandIconWrapper: "dw-TreeExpandIconWrapper",
	expandIcon: "dw-TreeExpandIcon",
	childNodes: "dw-TreeNodeChildren",
	itemWrapper: "dw-TreeNodeItemWrapper",
	labelWrapper: "dw-TreeNodeLabelWrapper",
	label: "dw-TreeNodeLabel",
	iconWrapper: "dw-TreeNodeIconWrapper",
	icon: "dw-TreeNodeIcon"
};

const expandIconWidth = "22px";

export const getStyles = (props: ITreeItemStyleProps): ITreeItemStyles => {
	const { className, disabled, selected, theme } = props;
	const classNames = GlobalClassNames;

	return {
		treeItem: [
			classNames.treeItem,
			{
				boxShadow: "border-box",
				listStyleType: "none",
				margin: 0,
				padding: 0,
				userSelect: "none"
			},
			disabled && "is-disabled",
			selected && "is-selected",
			className
		],

		treeNode: [
			classNames.treeNode,
			{
				alignItems: "center",
				display: "flex",
				height: "30px",
				selectors: {
					":hover": {
						cursor: disabled ? "not-allowed" : "pointer"
					}
				}
			}
		],

		expandIconWrapper: [
			classNames.expandIconWrapper,
			{
				width: expandIconWidth
			}
		],
		expandIcon: [
			classNames.expandIcon,
			{
				padding: "4px",
				selectors: {
					":hover": {
						cursor: "pointer"
					}
				}
			}
		],

		itemWrapper: [
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
		label: [classNames.label],

		childNodes: [classNames.childNodes, { paddingLeft: expandIconWidth }, AnimationClassNames.fadeIn100]
	};
};
