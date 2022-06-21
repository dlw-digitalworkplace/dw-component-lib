import { IAccessibleTreeItemStyleProps, IAccessibleTreeItemStyles } from "./AccessibleTreeItem.types";
import { expandIconWidth } from "./TreeItemContent/TreeItemContent.styles";

const GlobalClassNames = {
	root: "dw-AccessibleTreeItem",
	children: "dw-AccessibleTreeItem-children"
};

export const getStyles = (props: IAccessibleTreeItemStyleProps): IAccessibleTreeItemStyles => {
	const { className } = props;
	const classNames = GlobalClassNames;

	return {
		root: [
			classNames.root,
			{
				boxShadow: "border-box",
				listStyleType: "none",
				margin: 0,
				padding: 0,
				userSelect: "none"
			},
			className
		],

		children: [
			classNames.children,
			{
				paddingInlineStart: expandIconWidth
			}
		]
	};
};
