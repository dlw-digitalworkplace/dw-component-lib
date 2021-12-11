import { Story } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { IGroup } from "../models/IGroup";
import { IUser } from "../models/IUser";
import { PeoplePicker } from "../PeoplePicker";
import { IPeoplePickerProps } from "../PeoplePicker.types";
import { MockPeoplePickerProvider } from "../providers/MockPeoplePickerProvider";

export const Basic: Story<IPeoplePickerProps> = ({ ...args }) => {
	const [selectedItems, setSelectedItems] = useState<(IUser | IGroup)[]>([]);

	return (
		<PeoplePicker
			provider={new MockPeoplePickerProvider()}
			selectedItems={selectedItems}
			onChange={setSelectedItems}
		/>
	);
}
