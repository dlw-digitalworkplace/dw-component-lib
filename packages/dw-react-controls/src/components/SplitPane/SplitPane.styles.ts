import { ISplitPaneStyleProps, ISplitPaneStyles } from "./SplitPane.types";

const GlobalClassNames = {
	container: "dw-SplitPane-container",
	leftPane: "dw-SplitPane-leftPane",
	rightPane: "dw-SplitPane-rightPane",
	separator: "dw-SplitPane-separator",
	separatorLeft: "dw-SplitPane-separatorLeft",
	separatorRight: "dw-SplitPane-separatorRight"
};

export const getStyles = (props: ISplitPaneStyleProps): ISplitPaneStyles => {
	const { className, fixed, isDragging } = props;
	const classNames = GlobalClassNames;

	return {
		container: [
			classNames.container,
			{
				display: "flex",
				width: "100%",
				overflow: "hidden"
			},
			className
		],
		leftPane: [
			classNames.leftPane,
			{
				margin: "0",
				padding: "0",
				height: "100%",
				overflow: "hidden"
			},
			isDragging && {
				userSelect: "none"
			}
		],
		rightPane: [
			classNames.rightPane,
			{
				margin: "0",
				padding: "0",
				height: "100%",
				overflow: "hidden"
			},
			isDragging && {
				userSelect: "none"
			}
		],
		separator: [
			classNames.separator,
			!!!fixed && {
				cursor: "col-resize",
			}
		],
		separatorLeft: [
			classNames.separatorLeft,
			{
				width: "50%",
				height: "100%",
				borderRight: "solid 1px #ddd"
			}
		],
		separatorRight: [
			classNames.separatorRight,
			{
				width: "50%"
			}
		]
	};
}
