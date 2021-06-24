import { AnimationClassNames } from "office-ui-fabric-react/lib/Styling";
import { ITreeItemStyleProps, ITreeItemStyles } from "./TreeItem.types";

const GlobalClassNames = {
	treeItem: "dw-TreeItem",
	treeNode: "dw-TreeNode",
	contextMenuIconWrapper: "dw-TreeItemContextMenuIconWrapper",
	contextMenuIcon: "dw-TreeItemContextMenuIcon",
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
	const { className, disabled, expanded, selected } = props;
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
			expanded && "is-expanded",
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

		contextMenuIconWrapper: [
			classNames.contextMenuIconWrapper,
			{
				marginLeft: selected ? "3px" : "4px"
			}
		],

		contextMenuIcon: [classNames.contextMenuIcon],

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

		childNodes: [classNames.childNodes, { paddingLeft: expandIconWidth }, AnimationClassNames.fadeIn100]
	};
};
