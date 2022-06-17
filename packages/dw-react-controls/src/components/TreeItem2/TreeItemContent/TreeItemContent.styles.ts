import { ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const GlobalClassNames = {
	root: "dw-TreeItemContent"
};

export const getStyles = (props: ITreeItemContentStyleProps): ITreeItemContentStyles => {
	const { className, focused, selected } = props;
	const classNames = GlobalClassNames;

	return {
		root: [
			className,
			classNames.root,
			{},
			focused && {
				textDecoration: "underline"
			},
			selected && {
				fontWeight: "bold"
			}
		]
	};
};
