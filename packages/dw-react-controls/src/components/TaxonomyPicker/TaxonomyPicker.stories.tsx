import { Story } from "@storybook/react";
import * as React from "react";
import { ITermValue } from "../TermPicker";
import { MockTaxonomyProvider } from "./providers/MockTaxonomyProvider";
import { TaxonomyPicker } from "./TaxonomyPicker";
import { ITaxonomyPickerProps } from "./TaxonomyPicker.types";

const defaultArgTypes = {
	provider: { control: "none" },
	className: { control: "none" },
	theme: { control: "none" },
	labelProps: { control: "none" }
};

const defaultArgs: Partial<ITaxonomyPickerProps> = {
	allowAddingTerms: false,
	allowDeprecatedTerms: false,
	allowDisabledTerms: false,
	itemLimit: 3,
	label: "Demo taxonomy picker",
	required: false,
	selectedItems: [],
	dialogProps: {
		dialogContentProps: {
			title: "Select one or more terms",
			subText: 'Doubleclick on a term, or select it and click the "Add" button.'
		}
	}
};

export const Basic: Story<ITaxonomyPickerProps> = ({ onChange, ...args }) => {
	const [selected, setSelected] = React.useState<ITermValue[]>([]);

	return (
		<TaxonomyPicker
			{...args}
			provider={new MockTaxonomyProvider()}
			selectedItems={selected}
			onChange={setSelected}
			onRenderOpenDialogButton={undefined}
		/>
	);
};
Basic.argTypes = { ...defaultArgTypes };
Basic.args = { ...defaultArgs };
Basic.parameters = { docs: { source: { type: "code" } } };

export const AllowAddingTerms: Story<ITaxonomyPickerProps> = ({ onChange, ...args }) => {
	const [selected, setSelected] = React.useState<ITermValue[]>([]);

	return (
		<TaxonomyPicker
			{...args}
			allowAddingTerms={true}
			provider={new MockTaxonomyProvider()}
			selectedItems={selected}
			onChange={setSelected}
		/>
	);
};
AllowAddingTerms.storyName = "Allow adding terms";
AllowAddingTerms.argTypes = {
	...defaultArgTypes,
	allowAddingTerms: { control: "none" }
};
AllowAddingTerms.args = { ...defaultArgs };
AllowAddingTerms.parameters = { docs: { source: { type: "code" } }, actions: { disable: true } };
