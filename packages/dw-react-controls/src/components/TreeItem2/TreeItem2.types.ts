import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";

export interface ITreeItem2Props {
	disabled?: boolean;

	id?: string;

	label?: string;

	nodeId: string;

	/**
	 * Optional class for the root TreeItem element
	 */
	className?: string;

	/**
	 * Call to apply custom styling on the TreeItem element
	 */
	styles?: IStyleFunctionOrObject<ITreeItem2StyleProps, ITreeItem2Styles>;

	/**
	 * The current theme applied to the control
	 */
	theme?: ITheme;
}

export interface ITreeItem2StyleProps {
	className?: string;
	theme: ITheme;
}

export interface ITreeItem2Styles {
	root?: IStyle;
}
