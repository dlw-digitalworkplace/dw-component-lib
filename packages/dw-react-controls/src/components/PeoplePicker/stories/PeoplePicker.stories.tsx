import { Story } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { PeoplePickerItemSuggestion } from "..";
import { GroupType } from "../models/GroupType";
import { IGroup } from "../models/IGroup";
import { IUser } from "../models/IUser";
import { ObjectType } from "../models/ObjectType";
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
	errorMessage: undefined,
	searchFor: ObjectType.UsersAndGroups
};

export const Basic: Story<IPeoplePickerProps> = ({ onChange, ...args }) => {
	const [selectedItems, setSelectedItems] = useState<(IUser | IGroup)[]>([]);

	return (
		<PeoplePicker
			{...args}
			errorMessage={(args.required && selectedItems.length === 0) ? "Required" : args.errorMessage}
			provider={new MockPeoplePickerProvider()}
			selectedItems={selectedItems}
			onChange={setSelectedItems}
			onRenderSuggestion={undefined}
		/>
	);
}
Basic.storyName = "Basic usage"
Basic.argTypes = { ...defaultArgTypes };
Basic.args = { ...defaultArgs };
Basic.parameters = { docs: { source: { type: "code" } } };

export const CustomSuggestionRender: Story<IPeoplePickerProps> = ({ onChange, ...args }) => {
	const [selectedItems, setSelectedItems] = useState<(IUser | IGroup)[]>([]);
	const renderSuggetions = (item: (IUser | IGroup)) => {
		const object = item as any;
		if ("userPrincipalName" in item) {
			// Example for user: Provide custom properties to the PeoplePickerItemSuggestion
			return (
				<PeoplePickerItemSuggestion
					title={object.displayName} label={object.id} imageUrl={object.imageUrl}
				/>
			)
		} else {
			// Example for group: Render a fully custom element
			let groupType: string = "";
			switch ((item as IGroup).groupType) {
				case GroupType.AAD:
					groupType = "AAD"
					break;
				case GroupType.M365:
					groupType = "M365"
					break;
				case GroupType.SPO:
					groupType = "SPO"
					break;
			}
			return (
				<div style={{ padding: "5px" }}>{groupType} - {item.displayName}</div>
			)
		}

	}

	return (
		<PeoplePicker
			{...args}
			provider={new MockPeoplePickerProvider()}
			selectedItems={selectedItems}
			onChange={setSelectedItems}
			onRenderSuggestion={renderSuggetions}
		/>
	);
}
CustomSuggestionRender.storyName = "Custom suggestion rendering";
CustomSuggestionRender.argTypes = { ...defaultArgTypes };
CustomSuggestionRender.args = { ...defaultArgs, label: "Custom suggestion render" };
CustomSuggestionRender.parameters = { docs: { source: { type: "code" } }};

