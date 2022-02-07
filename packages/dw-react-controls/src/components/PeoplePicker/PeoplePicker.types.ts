import { ILabelProps } from "office-ui-fabric-react/lib/Label";
import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { PeoplePickerValue } from "./models";
import { IGroup } from "./models/IGroup";
import { IPeoplePickerProvider } from "./models/IPeoplePickerProvider";
import { IUser } from "./models/IUser";

export interface IPeoplePickerProps {
	/**
	 * Optional parameter to disable the component
	 */
	disabled?: boolean;

	/**
	 * Optional parameter to provide an error message to the component
	 */
	errorMessage?: string | JSX.Element;

	/**
	 * Optional parameter to limit the amount of options that can be slected
	 */
	itemLimit?: number;

	/**
	 * Optional parameter to render a label
	 */
	label?: string;

	/**
	 * Optional object to set the label props
	 */
	labelProps?: Partial<ILabelProps>;

	/**
	 * The people picker provider that should handle the data layer functionalities
	 */
	provider: IPeoplePickerProvider;

	/**
	 * Optional parameter to indicate that the value is required
	 */
	required?: boolean;

	/**
	 * The delay time in ms before resolving suggestions, which is kicked off when input has been changed.
	 * e.g. If a second input change happens within the resolveDelay time, the timer will start over.
	 * Only until after the timer completes will onResolveSuggestions be called.
	 */
	resolveDelay?: number;

	/**
	 * An array of selected users or groups
	 */
	selectedItems: PeoplePickerValue[];

	/**
	 * Optional class for the root Peple Picker element
	 */
	className?: string;
	/**
	 * Call to apply custom styling on the People Picker element
	 */
	styles?: IStyleFunctionOrObject<IPeoplePickerStyleProps, IPeoplePickerStyles>;
	/**
	 * Optional theme to provide to the people picker
	 */
	theme?: ITheme;

	/**
	 * onChange event that is triggered when the selection of the people picker changes
	 * @param items List of the selected users and groups
	 */
	onChange(items: PeoplePickerValue[]): void;

	/**
	 * An optional function to override the rendering of the suggestion items
	 * @param item The user or group to render
	 * @returns An element to render
	 */
	onRenderSuggestion?(item: IUser | IGroup): JSX.Element;
}

export interface IPeoplePickerStyleProps {
	className?: string;
	theme: ITheme;
}

export interface IPeoplePickerStyles {
	root?: IStyle;
	inputWrapper?: IStyle;
	input?: IStyle;
	errorMessage?: IStyle;
}
