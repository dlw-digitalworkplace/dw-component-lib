import { ITreeItemStyleProps, ITreeItemStyles } from "./TreeItem.types";
import { expandIconWidth } from "./TreeItemContent/TreeItemContent.styles";

const GlobalClassNames = {
	root: "dw-TreeItem",
	children: "dw-TreeItem-children"
};

export const getStyles = (props: ITreeItemStyleProps): ITreeItemStyles => {
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
