import * as React from "react";
import { Story } from "@storybook/react";
import { AutocompleteSearchBox } from "../AutocompleteSearchBox";
import { ICustomSuggestion, MockAutocompleteProvider } from "../providers/MockAutocompleteProvider";
import { IAutocompleteSearchBoxProps, IAutocompleteSearchBoxStyles } from "../AutocompleteSearchBox.types";

const mockService = new MockAutocompleteProvider();

//#region Basic usage
export const Basic: Story<IAutocompleteSearchBoxProps<string>> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onSearch={(value: string) => alert(value)}
			/>
		</div>
	);
};
Basic.storyName = "Basic usage";
Basic.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region With delay
export const WithDelay: Story<IAutocompleteSearchBoxProps<string>> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onSearch={(value: string) => alert(value)}
				resolveDelay={1000}
			/>
		</div>
	);
};
WithDelay.storyName = "With delay";
WithDelay.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region With callout properties
export const WithCalloutProperties: Story<IAutocompleteSearchBoxProps<string>> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onSearch={(value: string) => alert(value)}
				calloutTitle="Autocomplete Suggestions"
				calloutProps={{
					gapSpace: 0,
					isBeakVisible: true
				}}
			/>
		</div>
	);
};
WithCalloutProperties.storyName = "With callout properties";
WithCalloutProperties.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region Suggestion highlighting
export const SuggestionHighlighting: Story<IAutocompleteSearchBoxProps<string>> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onSearch={(value: string) => alert(value)}
				withSuggestionHighlighting={false}
			/>
		</div>
	);
};
SuggestionHighlighting.storyName = "Suggestion highlighting";
SuggestionHighlighting.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region Focus resolve suggestions
export const FocusResolveSuggestions: Story<IAutocompleteSearchBoxProps<string>> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onFocusResolveSuggestions={mockService.getOnFocusSuggestions}
				resolveDelay={1000}
				onSearch={(value: string) => alert(value)}
			/>
		</div>
	);
};
FocusResolveSuggestions.storyName = "Focus resolve suggestions";
FocusResolveSuggestions.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region Aborting resolve suggestions
export const Aborting: Story<IAutocompleteSearchBoxProps<string>> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={(value: string, signal: AbortSignal) => mockService.getSuggestions(value, signal)}
				onSearch={(value: string) => alert(value)}
			/>
		</div>
	);
};
Aborting.storyName = "Aborting resolve suggestions";
Aborting.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region Custom suggestion render
export const CustomSuggestionRender: Story<IAutocompleteSearchBoxProps<string>> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onSearch={(value: string) => alert(value)}
				onRenderSuggestion={(suggestion: string, defaultRenderer: (s: string) => JSX.Element) => defaultRenderer(suggestion.toUpperCase())}
			/>
		</div>
	);
};
CustomSuggestionRender.storyName = "Custom suggestion render";
CustomSuggestionRender.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region Custom suggestion object
export const CustomSuggestionObject: Story<IAutocompleteSearchBoxProps<ICustomSuggestion>> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getCustomSuggestions}
				onSearch={(value: ICustomSuggestion) => {
					const alerValue = `Searched for: ${value.suggestion} on ${value.dayOfWeek}`;
					alert(alerValue);
				}}
				onRenderSuggestion={(suggestion: ICustomSuggestion, defaultRenderer: (s: ICustomSuggestion) => JSX.Element) =>
					<div style={{
						display: "flex",
						justifyContent: "space-between"
					}}>
						<div>{defaultRenderer(suggestion)}</div>
						<span style={{
							fontStyle: "italic",
							fontSize: "12px"
						}}>{suggestion.dayOfWeek}</span>
					</div>
				}
			/>
		</div>
	);
};
CustomSuggestionObject.storyName = "Custom suggestion object";
CustomSuggestionObject.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region Custom Styling
export const CustomStyling: Story<IAutocompleteSearchBoxProps<string>> = ({ onChange, ...args }) => {
	const [value, setValue] = React.useState<string>("");
	const mockService = new MockAutocompleteProvider();
	const onResolveSuggestions = (value: string) => {
		if (value.length > 0) {
			return mockService.getSuggestions(value);
		} else {
			return Promise.resolve([]);
		}
	}
	const styles = () => ({
		subComponentStyles: {

			searchbox: {
				root: [
					{
						width: "240px",
						margin: "auto 0px auto 10",
						"input:hover": {
							content: "none !important"
						},

						"input:focus": {
							content: "none !important"
						}
					}
				]
			}, highlightedSuggestion: {
				rootHighlighted:
				{
					color: "magenta"
				}
			}
		}
	}) as IAutocompleteSearchBoxStyles;
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				showIcon={true}
				styles={styles}
				iconProps={{ iconName: "Search" }}
				confirmationButtonAriaDescription={"Search"}
				clearButtonProps={{ ariaDescription: "Clear text" }}
				calloutTitle="Autocomplete Suggestions"
				placeholder="Search for a suggestion"
				onChange={(_: Event, newValue: string) => setValue(newValue ?? "")}
				onSearch={(value: string) => alert(value)}
				onResolveSuggestions={onResolveSuggestions}
				value={value}
			/>
		</div>
	);
};
Basic.storyName = "Custom Styling";
Basic.parameters = { docs: { source: { type: "code" } } };
//#endregion
