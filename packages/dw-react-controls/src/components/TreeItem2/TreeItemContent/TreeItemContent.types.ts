import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";

export interface ITreeItemContentProps {
	/**
	 * The label to show for the tree node
	 */
	label?: string;

	/**
	 * The nodeId of the tree node
	 */
	nodeId: string;

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
	focused?: boolean;
	selected?: boolean;
	theme: ITheme;
}

export interface ITreeItemContentStyles {
	root?: IStyle;
}
