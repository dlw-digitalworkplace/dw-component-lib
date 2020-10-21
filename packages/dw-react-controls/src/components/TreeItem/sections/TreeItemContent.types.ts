import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";

export interface ITreeItemContentProps {
	/**
	 * The label to show for the tree item
	 */
	label: string;

	/**
	 * Specifies the icon name to show with the term label
	 */
	iconName?: string;

	/**
	 * Optional class for the root TreeItemContent element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TreeItemContent element
	 */
	styles?: IStyleFunctionOrObject<ITreeItemContentStyleProps, ITreeItemContentStyles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;
}

export interface ITreeItemContentStyleProps {
	className?: string;
	theme: ITheme;
}

export interface ITreeItemContentStyles {
	itemWrapper?: IStyle;
	iconWrapper?: IStyle;
	icon?: IStyle;
	labelWrapper?: IStyle;
	label?: IStyle;
}
