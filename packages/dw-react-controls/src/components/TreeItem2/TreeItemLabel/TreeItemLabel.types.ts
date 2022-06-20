import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";

export interface ITreeItemLabelProps {
	/**
	 * The label to show for the tree node
	 */
	label?: string;

	/**
	 * Optional class for the root TreeItemLabel element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TreeItemLabel element
	 */
	styles?: IStyleFunctionOrObject<ITreeItemLabelStyleProps, ITreeItemLabelStyles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;
}

export interface ITreeItemLabelStyleProps {
	className?: string;
	theme: ITheme;
}

export interface ITreeItemLabelStyles {
	root?: IStyle;
}
