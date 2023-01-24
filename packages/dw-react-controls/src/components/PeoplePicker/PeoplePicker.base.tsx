import {
	BasePicker,
	classNamesFunction,
	composeRenderFunction,
	IBasePickerSuggestionsProps,
	IInputProps,
	IPickerItemProps,
	IRenderFunction,
	Label
} from "@fluentui/react";
import * as React from "react";
import { IGroup, IUser, PeoplePickerValue } from "./models";
import { IPeoplePickerFilterOptions } from "./models/IPeoplePickerFilterOptions";
import { getInputStyles } from "./PeoplePicker.styles";
import { IPeoplePickerProps, IPeoplePickerStyleProps, IPeoplePickerStyles } from "./PeoplePicker.types";
import { PeoplePickerItem } from "./PeoplePickerItem";
import { PeoplePickerItemSuggestion } from "./PeoplePickerItemSuggestion";

const getClassNames = classNamesFunction<IPeoplePickerStyleProps, IPeoplePickerStyles>();

export const PeoplePickerBase: React.FC<IPeoplePickerProps> = ({
	className,
	errorMessage,
	inputProps: inputPropsProp,
	itemLimit,
	label,
	labelProps,
	pickerSuggestionsProps,
	provider,
	required,
	selectedItems = [],
	styles,
	theme,
	onBlur: onBlurProp,
	onGetMoreResults: onGetMoreResultsProp,
	onRenderItem,
	onRenderSuggestion,
	...rest
}: IPeoplePickerProps) => {
	const [isInvalid, setIsInvalid] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);

	// Check to see if the item limit is not exceeded
	React.useEffect(() => {
		setIsInvalid(itemLimit !== undefined && itemLimit > -1 && itemLimit < selectedItems.length);
	}, [itemLimit, selectedItems]);

	// Keep track of focus state
	const onFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
		if (inputPropsProp?.onFocus) {
			inputPropsProp.onFocus(ev);
		}

		setIsFocused(true);
	};

	const onBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
		if (onBlurProp) {
			onBlurProp(ev);
		}
		setIsFocused(false);
	};

	const inputProps: IInputProps = {
		...inputPropsProp,
		onFocus: onFocus
	};

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

		return await provider.findUsersOrGroups(filter, filterOptions);
	};

	// Search more results
	const onGetMoreResults = async (
		filter: string,
		currentSelection: PeoplePickerValue[]
	): Promise<(IUser | IGroup)[]> => {
		if (!filter || filter.length === 0) {
			return [];
		}

		const filterOptions: IPeoplePickerFilterOptions = {
			idsToIgnore: currentSelection.map((i) => i.id)
		};

		return await provider.findMoreUsersOrGroups(filter, filterOptions);
	};

	// Render items
	const renderItem: IRenderFunction<IPickerItemProps<PeoplePickerValue>> = (
		itemProps: IPickerItemProps<PeoplePickerValue>
	) => {
		return <PeoplePickerItem key={itemProps.item.id} {...itemProps} />;
	};

	const finalOnRenderItem = (pickerProps: IPickerItemProps<PeoplePickerValue>): JSX.Element => {
		const renderFunc = onRenderItem ? composeRenderFunction(onRenderItem, renderItem) : renderItem;

		return renderFunc(pickerProps) || <div />;
	};

	// Render suggestions
	const renderSuggestionsItem: IRenderFunction<IUser | IGroup> = (item: IUser | IGroup) => {
		return (
			<PeoplePickerItemSuggestion
				title={item.displayName}
				label={"userPrincipalName" in item ? item.userPrincipalName : item.description}
			/>
		);
	};

	const finalOnRenderSuggestionsItem = (item: IUser | IGroup): JSX.Element => {
		const renderFunc = onRenderSuggestion
			? composeRenderFunction(onRenderSuggestion, renderSuggestionsItem)
			: renderSuggestionsItem;

		return renderFunc(item) || <div />;
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

	const finalPickerSuggestionsProps: IBasePickerSuggestionsProps<IUser | IGroup> = {
		loadingText: "Searching...",
		noResultsFoundText: "No results found.",
		searchForMoreText: provider.hasSearchMoreCapability ? "Search more results..." : undefined,
		suggestionsHeaderText: "Suggestions",
		...pickerSuggestionsProps
	};

	const pickerStyles = getInputStyles({
		className: classNames.input,
		disabled: rest.disabled,
		inputClassName: inputProps?.className,
		isFocused: isFocused,
		isInvalid: isInvalid,
		theme: theme
	});

	return (
		<div className={classNames.root}>
			{!!label && (
				<Label required={required} {...labelProps}>
					{label}
				</Label>
			)}
			<div className={classNames.inputWrapper}>
				<BasePicker
					{...rest}
					className={classNames.input}
					inputProps={inputProps}
					itemLimit={itemLimit}
					onBlur={onBlur}
					onGetMoreResults={onGetMoreResultsProp || onGetMoreResults}
					onRenderItem={finalOnRenderItem}
					onRenderSuggestionsItem={finalOnRenderSuggestionsItem}
					onResolveSuggestions={onResolveSuggestions}
					pickerSuggestionsProps={finalPickerSuggestionsProps}
					selectedItems={selectedItems}
					styles={pickerStyles}
					theme={theme}
				/>
			</div>
			{!!errorMessage && renderErrorMessage(errorMessage)}
		</div>
	);
};
