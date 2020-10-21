import { Icon } from "office-ui-fabric-react/lib/Icon";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { ITreeItemContentProps, ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

const getClassNames = classNamesFunction<ITreeItemContentStyleProps, ITreeItemContentStyles>();

export const TreeItemContentBase: React.FC<ITreeItemContentProps> = React.forwardRef<
	HTMLLIElement,
	ITreeItemContentProps
>((props, ref) => {
	const { iconName, label, styles, className, theme } = props;

	const classNames = getClassNames(styles, { className, theme: theme! });

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
