import { IStyle } from "office-ui-fabric-react";
import { ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const GlobalClassNames = {
	root: "dw-TreeItemContent",
	expandIcon: "dw-TreeItemContent-expandIcon",
	labelWrapper: "dw-TreeItemContent-labelWrapper"
};

export const expandIconWidth = "20px";

export const getStyles = (props: ITreeItemContentStyleProps): ITreeItemContentStyles => {
	const { className, disabled, expandable, focused, selected, theme } = props;
	const classNames = GlobalClassNames;

	return {
		root: [
			className,
			classNames.root,
			{
				alignItems: "center",
				display: "flex"
			},
			disabled && { color: theme.semanticColors.disabledBodyText }
		],

		expandIcon: [
			classNames.expandIcon,
			{
				alignItems: "center",
				display: "flex",
				flexGrow: 0,
				flexShrink: 0,
				width: expandIconWidth
			},
			expandable && { cursor: "pointer" }
		],

		labelWrapper: [
			classNames.labelWrapper,
			{
				alignItems: "center",
				boxSizing: "border-box",
				cursor: disabled ? "not-allowed" : "pointer",
				display: "flex",
				gap: "8px",
				height: "30px",
				padding: "4px"
			} as IStyle,
			focused && {
				border: `1px solid ${theme.semanticColors.focusBorder}`,
				marginLeft: "-1px"
			},
			selected && {
				backgroundColor: theme.palette.themeLight,
				border: `1px solid ${theme.palette.themePrimary}`,
				marginLeft: "-1px"
			}
		]
	};
};
