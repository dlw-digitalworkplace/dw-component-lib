import { ITreeViewStyleProps, ITreeViewStyles } from "./TreeView.types";

const GlobalClassNames = {
	treeView: "dw-TreeView"
};

export const getStyles = (props: ITreeViewStyleProps): ITreeViewStyles => {
	const { className } = props;
	const classNames = GlobalClassNames;

	return {
		treeView: [
			classNames.treeView,
			{
				listStyleType: "none",
				margin: 0,
				padding: 0
			},
			className
		]
	};
};
