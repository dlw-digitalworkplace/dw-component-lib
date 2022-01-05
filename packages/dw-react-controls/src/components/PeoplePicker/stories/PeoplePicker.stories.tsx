// tslint:disable:no-bitwise
import { Story } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { PeoplePickerItemSuggestion } from "..";
import { PeoplePickerValue } from "../models";
import { IGroup } from "../models/IGroup";
import { IUser } from "../models/IUser";
import { PeoplePicker } from "../PeoplePicker";
import { IPeoplePickerProps } from "../PeoplePicker.types";
import { MockPeoplePickerProvider } from "../providers/MockPeoplePickerProvider";

const defaultArgTypes = {
	provider: { control: "none" },
	className: { control: "none" },
	theme: { control: "none" },
	labelProps: { control: "none" }
};

const defaultArgs: Partial<IPeoplePickerProps> = {
	itemLimit: 3,
	label: "Basic people picker",
	disabled: false,
	required: false,
	errorMessage: undefined
};

export const Basic: Story<IPeoplePickerProps> = ({ onChange, ...args }) => {
	const [selectedItems, setSelectedItems] = useState<PeoplePickerValue[]>([]);
	const provider = new MockPeoplePickerProvider();

	const handleChange = (items: PeoplePickerValue[]) => {
		if (onChange) {
			onChange(items);
		}

		setSelectedItems(items);
	};

	return (
		<PeoplePicker
			{...args}
			errorMessage={args.required && selectedItems.length === 0 ? "Required" : args.errorMessage}
			provider={provider}
			selectedItems={selectedItems}
			onChange={handleChange}
			onRenderSuggestion={undefined}
		/>
	);
};
Basic.storyName = "Basic usage";
Basic.argTypes = {
	...defaultArgTypes
};
Basic.args = { ...defaultArgs };
Basic.parameters = { docs: { source: { type: "code" } } };

export const CustomSuggestionRender: Story<IPeoplePickerProps> = ({ onChange, ...args }) => {
	const [selectedItems, setSelectedItems] = useState<PeoplePickerValue[]>([]);
	const provider = new MockPeoplePickerProvider();

	const handleChange = (items: PeoplePickerValue[]) => {
		if (onChange) {
			onChange(items);
		}

		setSelectedItems(items);
	};

	const renderSuggestions = (item: IUser | IGroup) => {
		const object = item as any;
		if ("userPrincipalName" in item) {
			// Example for user: Provide custom properties to the PeoplePickerItemSuggestion
			return (
				<PeoplePickerItemSuggestion
					title={object.displayName}
					label={object.id}
					imageUrl={object.additionalProperties.imageUrl}
				/>
			);
		} else {
			// Example for group: Render a fully custom element
			const groupType: string = (item as IGroup).additionalProperties?.groupType;

			return (
				<div style={{ padding: "5px" }}>
					{groupType} - {item.displayName}
				</div>
			);
		}
	};

	return (
		<PeoplePicker
			{...args}
			provider={provider}
			selectedItems={selectedItems}
			onChange={handleChange}
			onRenderSuggestion={renderSuggestions}
		/>
	);
};
CustomSuggestionRender.storyName = "Custom suggestion rendering";
CustomSuggestionRender.argTypes = { ...defaultArgTypes };
CustomSuggestionRender.args = { ...defaultArgs, label: "Custom suggestion render" };
CustomSuggestionRender.parameters = { docs: { source: { type: "code" } } };
