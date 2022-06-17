import { Story } from "@storybook/react";
import * as React from "react";
import { TreeItem2 } from "../../TreeItem2";
import { TreeView2 } from "../TreeView2";
import { TreeView2Props } from "../TreeView2.types";

const Template: Story<TreeView2Props> = ({ ...args }) => (
	<TreeView2 {...args}>
		<TreeItem2 nodeId="1" label={"Test 1"}>
			<TreeItem2 nodeId="1-1" label={"Test 1-1"} />
			<TreeItem2 nodeId="1-2" label={"Test 1-2"} />
			<TreeItem2 nodeId="1-3" label={"Test 1-3"} />
		</TreeItem2>
		<TreeItem2 nodeId="2" label={"Test 2"}>
			<TreeItem2 nodeId="2-1" label={"Test 2-1"}>
				<TreeItem2 nodeId="2-1-1" label={"Test 2-1-1"} />
				<TreeItem2 nodeId="2-1-2" label={"Test 2-1-2"} />
				<TreeItem2 nodeId="2-1-3" label={"Test 2-1-3"} />
			</TreeItem2>
			<TreeItem2 nodeId="2-2" label={"Test 2-2"} />
			<TreeItem2 nodeId="2-3" label={"Test 2-3"} />
		</TreeItem2>
	</TreeView2>
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
