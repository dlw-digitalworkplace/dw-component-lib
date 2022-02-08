import { Label } from "office-ui-fabric-react";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { IGroup, IUser, PeoplePickerValue } from "./models";
import { IPeoplePickerFilterOptions } from "./models/IPeoplePickerFilterOptions";
import { IPeoplePickerProps, IPeoplePickerStyleProps, IPeoplePickerStyles } from "./PeoplePicker.types";
import { UserOrGroupPicker } from "./UserOrGroupPicker";

const getClassNames = classNamesFunction<IPeoplePickerStyleProps, IPeoplePickerStyles>();

export const PeoplePickerBase: React.FC<IPeoplePickerProps> = ({
	className,
	disabled,
	errorMessage,
	itemLimit,
	label,
	labelProps,
	provider,
	required,
	resolveDelay,
	selectedItems,
	styles,
	theme,
	onChange,
	onRenderSuggestion
}: IPeoplePickerProps) => {
	// Get classnames
	const classNames = getClassNames(styles, { className, theme: theme! });

	// Resolve suggestions
	const onResolveSuggestions = async (
		filter: string,
		currentSelection: PeoplePickerValue[]
	): Promise<(IUser | IGroup)[]> => {
		if (!filter || filter.length === 0) {
			return [];
		}

		const filterOptions: IPeoplePickerFilterOptions = {
			idsToIgnore: currentSelection.map((i) => i.id)
		};

		return await provider.findUserOrGroup(filter, filterOptions);
	};

	// Error message
	const renderErrorMessage = React.useCallback(
		(message: string | JSX.Element) => {
			return typeof message === "string" ? (
				<p className={classNames.errorMessage}>
					<span data-automation-id={"error-message"}>{message}</span>
				</p>
			) : (
				<div className={classNames.errorMessage} data-automation-id={"error-message"}>
					{message}
				</div>
			);
		},
		[classNames.errorMessage]
	);

	return (
		<div className={classNames.root}>
			{!!label && (
				<Label required={required} {...labelProps}>
					{label}
				</Label>
			)}
			<div className={classNames.inputWrapper}>
				<UserOrGroupPicker
					className={classNames.input}
					disabled={disabled}
					itemLimit={itemLimit}
					resolveDelay={resolveDelay}
					selectedItems={selectedItems}
					onChange={onChange}
					onRenderSuggestion={onRenderSuggestion}
					onResolveSuggestions={onResolveSuggestions}
				/>
			</div>
			{!!errorMessage && renderErrorMessage(errorMessage)}
		</div>
	);
};
