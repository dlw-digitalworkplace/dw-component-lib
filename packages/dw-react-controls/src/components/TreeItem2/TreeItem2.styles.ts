import { ITreeItem2StyleProps, ITreeItem2Styles } from "./TreeItem2.types";

const GlobalClassNames = {
	root: "dw-TreeItem2"
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
		]
	};
};
