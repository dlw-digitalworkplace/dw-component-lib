import { Story } from "@storybook/react";
import * as React from "react";
import { TreeItem } from "../../TreeItem";
import { TreeView } from "../TreeView";
import { TreeViewProps } from "../TreeView.types";

const Template: Story<TreeViewProps> = ({ ...args }) => (
	<TreeView {...args} disabledChildrenEnabled={true}>
		<TreeItem nodeId="1" label={"a Test 1"}>
			<TreeItem nodeId="1-1" label={"a Test 1-1"} iconName={"Tag"} />
			<TreeItem nodeId="1-2" label={"b Test 1-2"} />
			<TreeItem nodeId="1-3" label={"c Test 1-3"} />
		</TreeItem>
		<TreeItem nodeId="2" label={"b Test 2"}>
			<TreeItem nodeId="2-1" label={"a Test 2-1"} disabled={true}>
				<TreeItem nodeId="2-1-1" label={"a Test 2-1-1"} />
				<TreeItem nodeId="2-1-2" label={"b Test 2-1-2"} />
				<TreeItem nodeId="2-1-3" label={"c Test 2-1-3"} />
			</TreeItem>
			<TreeItem nodeId="2-2" label={"b Test 2-2"} />
			<TreeItem nodeId="2-3" label={"c Test 2-3"} />
		</TreeItem>
	</TreeView>
);

const defaultArgTypes = {
	defaultExpanded: { control: "none" },
	expanded: { control: "none" },
	defaultSelected: { control: "none" },
	selected: { control: "none" },
	className: { control: "none" },
	onNodeSelect: { control: "none" },
	onNodeToggle: { control: "none" }
};

export const Basic = Template.bind({});
Basic.argTypes = { ...defaultArgTypes };
Basic.args = {};
