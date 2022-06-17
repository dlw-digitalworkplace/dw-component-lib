import { ITreeView2StyleProps, ITreeView2Styles } from "./TreeView2.types";

const GlobalClassNames = {
	TreeView2: "dw-TreeView2"
};

export const getStyles = (props: ITreeView2StyleProps): ITreeView2Styles => {
	const { className } = props;
	const classNames = GlobalClassNames;

	return {
		TreeView2: [
			classNames.TreeView2,
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
