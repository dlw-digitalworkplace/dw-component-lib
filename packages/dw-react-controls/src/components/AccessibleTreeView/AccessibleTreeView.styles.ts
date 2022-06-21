import { IAccessibleTreeViewStyleProps, IAccessibleTreeViewStyles } from "./AccessibleTreeView.types";

const GlobalClassNames = {
	AccessibleTreeView: "dw-AccessibleTreeView"
};

export const getStyles = (props: IAccessibleTreeViewStyleProps): IAccessibleTreeViewStyles => {
	const { className } = props;
	const classNames = GlobalClassNames;

	return {
		AccessibleTreeView: [
			classNames.AccessibleTreeView,
			{
				listStyleType: "none",
				margin: 0,
				outline: 0,
				padding: 0
			},
			className
		]
	};
};
