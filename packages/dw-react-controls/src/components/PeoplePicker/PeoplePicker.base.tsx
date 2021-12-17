import { Label } from "office-ui-fabric-react";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { IGroup, IUser } from "./models";
import { IPeoplePickerFilterOptions } from "./models/IPeoplePickerFilterOptions";
import { SearchType } from "./models/SearchType";
import { IPeoplePickerProps, IPeoplePickerStyleProps, IPeoplePickerStyles } from "./PeoplePicker.types";
import { UserOrGroupPicker } from "./UserOrGroupPicker/UserOrGroupPicker";

const getClassNames = classNamesFunction<IPeoplePickerStyleProps, IPeoplePickerStyles>();

export const PeoplePickerBase: React.FC<IPeoplePickerProps> = ({
	provider,
	selectedItems,
	itemLimit,
	label,
	disabled,
	required,
	labelProps,
	errorMessage,
	styles,
	className,
	theme,
	searchFor,
	groupTypes,
	onChange,
	onRenderSuggestion
}: IPeoplePickerProps) => {
	// Get classnames
	const classNames = getClassNames(styles, { className, theme: theme! });

	// Resolve suggestions
	const onResolveSuggestions = async (
		filter: string,
		currentSelection: (IUser | IGroup)[]
	): Promise<(IUser | IGroup)[]> => {

		if (!filter || filter.length === 0) {
			return [];
		}

		const filterOptions: IPeoplePickerFilterOptions = {
			idsToIgnore: currentSelection.map(i => i.id),
			searchFor: searchFor ?? SearchType.UsersAndGroups,
			groupTypes: groupTypes
		};
		return await provider.findUserOrGroup(filter, filterOptions);
	}

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
					selectedItems={selectedItems}
					onResolveSuggestions={onResolveSuggestions}
					onChange={onChange}
					disabled={disabled}
					itemLimit={itemLimit}
					onRenderSuggestion={onRenderSuggestion}
				/>
			</div>
			{!!errorMessage && renderErrorMessage(errorMessage)}
		</div>
	);
};

