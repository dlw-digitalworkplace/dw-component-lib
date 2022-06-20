import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { ITreeItemLabelProps, ITreeItemLabelStyleProps, ITreeItemLabelStyles } from "./TreeItemLabel.types";

const getClassNames = classNamesFunction<ITreeItemLabelStyleProps, ITreeItemLabelStyles>();

export const TreeItemLabelBase: React.FC<ITreeItemLabelProps> = React.forwardRef<HTMLDivElement, ITreeItemLabelProps>(
	(props, ref) => {
		const { children } = props;

		const { styles, className, theme } = props;
		const classNames = getClassNames(styles, { className, theme: theme! });

		return (
			<div className={classNames.root} ref={ref}>
				{children}
			</div>
		);
	}
);
