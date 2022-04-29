import { IStyle } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";

export interface ISplitPaneProps {
	/**
	 * Required array of the initial pane sizes in %.
	 * E.g. [50, 50] for two panes of equal size.
	 */
  initialSizes: [number, number];

	/**
	 * Optional parameter to indicate the minimum width of the left pane in %.
	 */
  minWidthLeftPane?: number;

	/**
	 * Optional parameter to indicate the minimum width of the right pane in %.
	 */
  minWidthRightPane?: number;

	/**
	 * Optional parameter to set the SplitPane to be fixed
	 * The panes will not be resizable.
	 */
	fixed?: boolean;

	/**
	 * Optional parameter to add a custom class name to the root element of the SplitPane component
	 */
	className?: string;

	/**
	 * Optional styling function to apply custom styling to the SplitPane.
	 */
	styles?: IStyleFunctionOrObject<ISplitPaneStyleProps, ISplitPaneStyles>;

	/**
	 * Required function that renders the content of the left pane
	 */
	onRenderLeftPane(): JSX.Element;

	/**
	 * Required function that renders the content of the right pane
	 */
  onRenderRightPane(): JSX.Element;
}

export interface ISplitPaneStyleProps {
	className?: string;
	fixed?: boolean;
	isDragging?: boolean;
}

export interface ISplitPaneStyles {
	container?: IStyle;
	leftPane?: IStyle;
	rightPane?: IStyle;
	separator?: IStyle;
	separatorLeft?: IStyle;
	separatorRight?: IStyle;
}
