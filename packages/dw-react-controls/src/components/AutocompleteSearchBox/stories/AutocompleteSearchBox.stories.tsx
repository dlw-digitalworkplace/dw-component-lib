import * as React from "react";
import { Story } from "@storybook/react";
import { AutocompleteSearchBox } from "../AutocompleteSearchBox";
import { MockAutocompleteProvider } from "../providers/MockAutocompleteProvider";
import { IAutocompleteSearchBoxProps, IAutocompleteSearchBoxStyles } from "../AutocompleteSearchBox.types";

const mockService = new MockAutocompleteProvider();
const onResolveSuggestions = (value: string) => {
	if (value.length > 0) {
		return mockService.getSuggestions(value);
	} else {
		return Promise.resolve([]);
	}
}

export const Basic: Story<IAutocompleteSearchBoxProps> = ({ onChange, ...args }) => {
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				onResolveSuggestions={onResolveSuggestions}
				onSearch={(value) => alert(value)}
			/>
		</div>
	);
};
Basic.storyName = "Basic usage";
Basic.parameters = { docs: { source: { type: "code" } } };

export const Advanced: Story<IAutocompleteSearchBoxProps> = ({ onChange, ...args }) => {
	const [value, setValue] = React.useState<string>("");
	return (
		<div style={{ height: "500px" }}>
			<AutocompleteSearchBox
				iconProps={{ iconName: "Search" }}
				confirmationButtonAriaDescription={"Search"}
				clearButtonProps={{ ariaDescription: "Clear text" }}
				calloutTitle="Autocomplete Suggestions"
				placeholder="Search for a suggestion"
				onChange={(_, newValue) => setValue(newValue ?? "")}
				onSearch={(value) => alert(value)}
				onResolveSuggestions={onResolveSuggestions}
				value={value}
				withSuggestionHighlighting={false}
				resolveDelay={500}
			/>
		</div>
	);
};
Advanced.storyName = "Advanced usage";
Advanced.parameters = { docs: { source: { type: "code" } } };

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
