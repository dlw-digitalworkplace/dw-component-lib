import * as React from "react";
import { Story } from "@storybook/react";
import { AutocompleteSearchBox } from "../AutocompleteSearchBox";
import { MockAutocompleteProvider } from "../providers/MockAutocompleteProvider";
import { IAutocompleteSearchBoxProps, IAutocompleteSearchBoxStyles } from "../AutocompleteSearchBox.types";

const mockService = new MockAutocompleteProvider();

//#region Basic usage
export const Basic: Story<IAutocompleteSearchBoxProps> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onSearch={(value) => alert(value)}
			/>
		</div>
	);
};
Basic.storyName = "Basic usage";
Basic.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region With delay
export const WithDelay: Story<IAutocompleteSearchBoxProps> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onSearch={(value) => alert(value)}
				resolveDelay={1000}
			/>
		</div>
	);
};
WithDelay.storyName = "With delay";
WithDelay.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region With callout properties
export const WithCalloutProperties: Story<IAutocompleteSearchBoxProps> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onSearch={(value) => alert(value)}
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
export const SuggestionHighlighting: Story<IAutocompleteSearchBoxProps> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onSearch={(value) => alert(value)}
				withSuggestionHighlighting={false}
			/>
		</div>
	);
};
SuggestionHighlighting.storyName = "Suggestion highlighting";
SuggestionHighlighting.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region Focus resolve suggestions
export const FocusResolveSuggestions: Story<IAutocompleteSearchBoxProps> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={mockService.getSuggestions}
				onFocusResolveSuggestions={mockService.getOnFocusSuggestions}
				resolveDelay={1000}
				onSearch={(value) => alert(value)}
			/>
		</div>
	);
};
FocusResolveSuggestions.storyName = "Focus resolve suggestions";
FocusResolveSuggestions.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region Aborting resolve suggestions
export const Aborting: Story<IAutocompleteSearchBoxProps> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={(value, signal) => mockService.getSuggestions(value, signal)}
				onSearch={(value) => alert(value)}
			/>
		</div>
	);
};
Aborting.storyName = "Aborting resolve suggestions";
Aborting.parameters = { docs: { source: { type: "code" } } };
//#endregion

//#region Custom Styling
export const CustomStyling: Story<IAutocompleteSearchBoxProps> = ({ onChange, ...args }) => {
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
				onChange={(e, newValue) => setValue(newValue ?? "")}
				onSearch={(value) => alert(value)}
				onResolveSuggestions={onResolveSuggestions}
				value={value}
			/>
		</div>
	);
};
Basic.storyName = "Custom Styling";
Basic.parameters = { docs: { source: { type: "code" } } };
//#endregion
