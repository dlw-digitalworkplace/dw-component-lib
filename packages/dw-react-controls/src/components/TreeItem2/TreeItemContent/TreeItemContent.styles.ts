import { ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const GlobalClassNames = {
	root: "dw-TreeItemContent",
	expandIcon: "dw-TreeItemContent-expandIcon"
};

export const getStyles = (props: ITreeItemContentStyleProps): ITreeItemContentStyles => {
	const { className, focused, selected } = props;
	const classNames = GlobalClassNames;

	return {
		root: [
			className,
			classNames.root,
			{
				display: "flex"
			},
			focused && {
				textDecoration: "underline"
			},
			selected && {
				fontWeight: "bold"
			}
		],

		expandIcon: [
			classNames.expandIcon,
			{
				flexGrow: 0,
				flexShrink: 0
			}
		]
	};
};
