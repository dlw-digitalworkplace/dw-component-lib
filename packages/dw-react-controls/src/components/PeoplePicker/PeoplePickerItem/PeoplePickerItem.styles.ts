import { getFocusStyle, getGlobalClassNames } from "@fluentui/react";
import { IPeoplePickerItemStyleProps, IPeoplePickerItemStyles } from "./PeoplePickerItem.types";

const GlobalClassNames = {
	root: "ms-PeoplePickerItem",
	text: "ms-PeoplePickerItem-text",
	close: "ms-PeoplePickerItem-close",
	isSelected: "is-selected"
};

const TAG_HEIGHT = 26;

export function getStyles(props: IPeoplePickerItemStyleProps): IPeoplePickerItemStyles {
	const { className, theme } = props;

	const { palette, fonts, semanticColors } = theme;

	const classNames = getGlobalClassNames(GlobalClassNames, theme);

	return {
		root: [
			classNames.root,
			fonts.medium,
			getFocusStyle(theme),
			{
				boxSizing: "content-box",
				flexShrink: "1",
				margin: 2,
				height: TAG_HEIGHT,
				lineHeight: TAG_HEIGHT,
				cursor: "default",
				userSelect: "none",
				display: "flex",
				flexWrap: "nowrap",
				alignItems: "center",
				maxWidth: 300,
				minWidth: 0, // needed to prevent long tags from overflowing container
				borderRadius: "15px",
				color: semanticColors.inputText,
				backgroundColor: "#f3f2f1"
			},
			className
		],
		text: [
			classNames.text,
			{
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				minWidth: 30,
				margin: `0 ${theme.spacing.s1}`
			}
		],
		close: [
			classNames.close,
			{
				color: palette.neutralSecondary,
				width: 26,
				height: "100%",
				flex: "0 0 auto",
				borderRadius: "50%",
				selectors: {
					":hover": {
						background: palette.neutralQuaternaryAlt,
						color: palette.neutralPrimary
					},
					":active": {
						color: palette.white,
						backgroundColor: palette.themeDark
					}
				}
			}
		]
	};
}
