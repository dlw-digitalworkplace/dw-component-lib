import { ITreeItem2StyleProps, ITreeItem2Styles } from "./TreeItem2.types";
import { expandIconWidth } from "./TreeItemContent/TreeItemContent.styles";

const GlobalClassNames = {
	root: "dw-TreeItem2",
	children: "dw-TreeItem2-children"
};

export const getStyles = (props: ITreeItem2StyleProps): ITreeItem2Styles => {
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
