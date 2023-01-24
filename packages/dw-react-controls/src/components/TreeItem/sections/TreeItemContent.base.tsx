import { classNamesFunction, Icon } from "@fluentui/react";
import * as React from "react";
import { ITreeItemContentProps, ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const getClassNames = classNamesFunction<ITreeItemContentStyleProps, ITreeItemContentStyles>();

export const TreeItemContentBase: React.FC<ITreeItemContentProps> = React.forwardRef<
	HTMLLIElement,
	ITreeItemContentProps
>((props, ref) => {
	const { disabled, expanded, selected, iconName, label, styles, className, theme } = props;

	const classNames = getClassNames(styles, { className, selected, expanded, disabled, theme: theme! });

	return (
		<div className={classNames.itemWrapper}>
			{iconName && (
				<div className={classNames.iconWrapper}>
					<Icon className={classNames.icon} iconName={iconName} />
				</div>
			)}

			<div className={classNames.labelWrapper}>
				<div className={classNames.label}>{label}</div>
			</div>
		</div>
	);
});
