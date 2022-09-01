import { ITreeViewStyleProps, ITreeViewStyles } from "./TreeView.types";

const GlobalClassNames = {
	TreeView: "dw-TreeView"
};

export const getStyles = (props: ITreeViewStyleProps): ITreeViewStyles => {
	const { className } = props;
	const classNames = GlobalClassNames;

	return {
		TreeView: [
			classNames.TreeView,
			{
				listStyleType: "none",
				margin: 0,
				outline: 0,
				padding: 0
			},
			className
		]
	};
};
