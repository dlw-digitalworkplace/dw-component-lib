import * as React from "react";
import * as ReactDOM from "react-dom";
import { ISearchBoxStyles, SearchBox } from "@fluentui/react/lib/components/SearchBox";
import { IAutocompleteSearchBoxProps, IAutocompleteSearchBoxStyleProps, IAutocompleteSearchBoxStyles } from "./AutocompleteSearchBox.types";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import { IconButton } from "@fluentui/react/lib/components/Button";
import { Callout, ICalloutContentStyles } from "@fluentui/react/lib/Callout";
import { IProgressIndicatorStyles, ProgressIndicator } from "@fluentui/react/lib/components/ProgressIndicator";
import { useDebounceFn } from "@dlw-digitalworkplace/dw-react-utils";
import { FocusZone, FocusZoneDirection, IFocusZone } from "@fluentui/react/lib/FocusZone";
import { ILinkStyles, Link } from "@fluentui/react/lib/Link";
import { IHighlightedSuggestionStyles } from "./HighlightedSuggestion/HighlightedSuggestion.types";
import { HighlightedSuggestion } from "./HighlightedSuggestion/HighlightedSuggestion";

const getClassNames = classNamesFunction<IAutocompleteSearchBoxStyleProps, IAutocompleteSearchBoxStyles>();

export const AutocompleteSearchBoxBase: React.FC<IAutocompleteSearchBoxProps> = (props) => {
	const { className, styles, theme, value, calloutTitle, calloutProps, showIcon } = props;
	const { onResolveSuggestions, onFocusResolveSuggestions } = props;

	// Controller
	const onResolveController = React.useRef<AbortController>();

	// Compute values
	const withHighlighting = React.useMemo(() => props.withSuggestionHighlighting ?? true, [props.withSuggestionHighlighting]);
	const withConfirmationButton = React.useMemo(() => props.withAccessibleConfirmationButton ?? true, [props.withAccessibleConfirmationButton]);
	const hasSearchBoxValue = React.useMemo(() => (value?.length ?? 0) > 0 && value !== "*", [value]);
	const hideIcon = React.useMemo(() => showIcon === true && withConfirmationButton && hasSearchBoxValue, [showIcon, hasSearchBoxValue]);

	// Get the classnames
	const classNames = getClassNames(styles, {
		className,
		theme: theme,
		hideIcon
	});

	//#region SearchBox Callout
	const searchBoxWrapper = React.useRef<HTMLDivElement>(null);
	const calloutZone = React.useRef<IFocusZone>(null);
	const [searchboxValue, setSearchboxValue] = React.useState<string>("");
	const [searbhboxOriginalValue, setSearchboxOriginalValue] = React.useState<string>("");
	const [suggestions, setSuggestions] = React.useState<string[]>([]);
	const [isResolving, setIsResolving] = React.useState(false);
	const [isCalloutVisible, setIsCalloutVisible] = React.useState(false);
	const [isCalloutFocussed, setIsCalloutFocussed] = React.useState(false)

	React.useEffect(() => {
		setSearchboxValue(props.value ?? "");
	}, [value]);

	const onSearchBoxKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "ArrowDown") {
			setIsCalloutFocussed(true);
			calloutZone.current?.focus(true);
			event.preventDefault();
		} else {
			setIsCalloutFocussed(false);
		}
	};
	const onFocusZoneKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		if (event.key === "Tab") {
			event.preventDefault();
			searchBoxWrapper.current?.getElementsByTagName("input")[0].focus();
			setSearchboxOriginalValue(searchboxValue);
		}
	};
	const onActiveElementChanged = (element?: HTMLElement) => {
		// Set the searchbox value to the selected suggestion
		setSearchboxValue(element?.firstChild?.textContent?.trim() ?? "");
	};
	//#endregion

	//#region SearchBox Confirmation Element
	const searchBoxElement = React.useRef<HTMLDivElement>(null);
	const [searchBoxInputElement, setSearchBoxInputElement] = React.useState<HTMLElement>();
	const [searchBoxConfirmationElement, setSearchBoxConfirmationElement] = React.useState<HTMLElement>();

	React.useEffect(() => {
		if (withConfirmationButton) {
			const searchBoxElementValue = searchBoxElement.current?.getElementsByTagName("input")?.item(0);
			if (searchBoxElementValue) {
				setSearchBoxInputElement(searchBoxElementValue);
			}
		}
	}, [searchBoxElement]);
	React.useEffect(() => {
		if (withConfirmationButton) {
			if (searchBoxInputElement && hasSearchBoxValue) {
				renderSearchBoxConfirmationElement();
			}
		}
	}, [searchBoxInputElement]);
	const handleSearchBoxConfirmation = () => {
		if (!!searchBoxInputElement) {
			searchBoxInputElement.dispatchEvent(
				new KeyboardEvent("keydown", {
					key: "Enter",
					keyCode: 13,
					bubbles: true
				})
			);
		}
	};
	const renderSearchBoxConfirmationElement = () => {
		if (!!searchBoxInputElement && searchBoxConfirmationElement === undefined) {
			const confirmationElement = document.createElement("div");
			confirmationElement.className = classNames.confirmation ?? "";

			ReactDOM.render(
				<IconButton
					ariaDescription={props.confirmationButtonAriaDescription}
					iconProps={{ iconName: "Search" }}
					onClick={handleSearchBoxConfirmation}
				/>,
				confirmationElement
			);

			searchBoxInputElement.insertAdjacentElement("afterend", confirmationElement);
			setSearchBoxConfirmationElement(confirmationElement);
		}
		return;
	};
	const removeSearchBoxConfirmationElement = () => {
		if (!!searchBoxConfirmationElement) {
			searchBoxConfirmationElement.remove();
			setSearchBoxConfirmationElement(undefined);
		}
	};
	//#endregion

	//#region Event Handlers
	const onClear = (ev: React.ChangeEvent) => {
		removeSearchBoxConfirmationElement();
		props.onClear && props.onClear(ev);
	};
	const onChange = (ev: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
		// Render the confirmation button
		if (withConfirmationButton) {
			newValue === "" ? removeSearchBoxConfirmationElement() : renderSearchBoxConfirmationElement();
		}

		// Call the onChange event
		if (props.onChange) {
			props.onChange(ev, newValue);
		} else {
			setSearchboxValue(newValue);
		}

		// Keep track of the original value
		setSearchboxOriginalValue(newValue || "");

		// Set state
		setIsResolving(!!newValue);
		setIsCalloutVisible(!!newValue);
		setSuggestions(!!newValue ? suggestions : []);

		// Abort the previous onResolve call
		if (onResolveController.current) {
			onResolveController.current.abort();
		}

		// Create new controller
		onResolveController.current = new AbortController();

		// Resolve the suggestions
		onResolveSuggestionsDebounced(newValue);
	};
	const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		// Execute the onFocusResolveSuggestions if available
		if (event.target.value?.length === 0 && !!onFocusResolveSuggestions) {
			// Set state
			setIsResolving(true);
			setIsCalloutVisible(true);
			setSuggestions([]);

			// Abort the previous call
			if (onResolveController.current) {
				onResolveController.current.abort();
			}

			// Create new controller
			onResolveController.current = new AbortController();

			onFocusResolveSuggestions(onResolveController.current.signal)
				.then((suggestions) => {
					// Set state
					setSuggestions(suggestions);
					setIsResolving(false);

					// Clear the controller
					onResolveController.current = undefined;
				})
				.catch((err) => {
					// Swallow the abort error
					if (err.name !== "AbortError") {
						console.error(err);
					}
				});
		} else {
			props.onFocus && props.onFocus(event);
		}
	};
	const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		setSuggestions([]);
		props.onBlur && props.onBlur(event);
	}
	const onSearch = (newValue: string) => {
		setIsCalloutVisible(false);
		setIsCalloutFocussed(false);
		setSuggestions([]);
		props.onSearch && props.onSearch(newValue);
	};
	const onResolveSuggestionsDebounced = useDebounceFn((value: string) => {
		// Resolve the suggestions
		onResolveSuggestions(value, onResolveController?.current?.signal)
			.then((suggestions) => {
				// Set state
				setSuggestions(suggestions);
				setIsResolving(false);

				// Clear the controller
				onResolveController.current = undefined;
			})
			.catch((err) => {
				// Swallow the abort error
				if (err.name !== "AbortError") {
					console.error(err);
				}
			});
	}, props.resolveDelay ?? 0);
	//#endregion

	//#region Render functions
	const renderSuggestion = (suggestion: string, index: number) => {
		return (
			<div className={classNames.suggestion} role="listitem" key={index}>
				<Link
					className={classNames.suggestionLink}
					styles={(classNames.subComponentStyles as any).suggestionLink as ILinkStyles}
					onClick={onSearch ? () => onSearch(suggestion) : undefined}
				>
					{withHighlighting ? (
						<HighlightedSuggestion
							text={suggestion}
							filter={searbhboxOriginalValue}
							styles={(classNames.subComponentStyles as any).highlightedSuggestion as IHighlightedSuggestionStyles}
						/>
					) : (
						<>{suggestion}</>
					)}
				</Link>
			</div>
		);
	};
	//#endregion

	return (
		<>
			<div ref={searchBoxWrapper} className={classNames.container}>
				<SearchBox
					{...props}
					className={classNames.root}
					styles={(classNames.subComponentStyles as any).searchbox as ISearchBoxStyles}
					ref={searchBoxElement}
					placeholder={props.placeholder}
					defaultValue={hasSearchBoxValue ? value : ""}
					onChange={onChange}
					onClear={onClear}
					onFocus={onFocus}
					onBlur={onBlur}
					onSearch={onSearch}
					onKeyDown={onSearchBoxKeyDown}
					value={searchboxValue}
				/>
			</div>
			{(isResolving || (suggestions?.length ?? 0) > 0) && isCalloutVisible && (
				<Callout
					{...calloutProps}
					styles={(classNames.subComponentStyles as any).callout as ICalloutContentStyles}
					target={searchBoxWrapper.current}
					setInitialFocus={isCalloutFocussed}
					doNotLayer={true}
					isBeakVisible={calloutProps?.isBeakVisible ?? false}
					onDismiss={() => setIsCalloutVisible(false)}
				>
					{/* Title */}
					{!!calloutTitle && (
						<div className={classNames.calloutTitle}>{calloutTitle}</div>
					)}

					{/* Progress Indicator */}
					{isResolving ? (
						<ProgressIndicator styles={(classNames.subComponentStyles as any).progressIndicator as IProgressIndicatorStyles} />
					) : (
						<div className={classNames.calloutProgressIndicatorPlaceholder} />
					)}

					{/* Content */}
					<FocusZone
						direction={FocusZoneDirection.bidirectional}
						componentRef={calloutZone}
						onActiveElementChanged={onActiveElementChanged}
						onKeyDown={onFocusZoneKeyDown}
					>
						<div className={classNames.calloutContent}>
							{suggestions?.map(renderSuggestion)}
						</div>
					</FocusZone>
				</Callout>
			)}
		</>
	);
};
