import { ITreeItemLabelStyleProps, ITreeItemLabelStyles } from "./TreeItemLabel.types";

const GlobalClassNames = {
	root: "dw-TreeItemLabel"
};

export const getStyles = (props: ITreeItemLabelStyleProps): ITreeItemLabelStyles => {
	const { className } = props;
	const classNames = GlobalClassNames;

	return {
		root: [className, {}, classNames.root]
	};
};
