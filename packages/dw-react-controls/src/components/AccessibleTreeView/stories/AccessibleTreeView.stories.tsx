import { Story } from "@storybook/react";
import * as React from "react";
import { AccessibleTreeItem } from "../../AccessibleTreeItem";
import { AccessibleTreeView } from "../AccessibleTreeView";
import { AccessibleTreeViewProps } from "../AccessibleTreeView.types";

const Template: Story<AccessibleTreeViewProps> = ({ ...args }) => (
	<AccessibleTreeView {...args} disabledChildrenEnabled={true}>
		<AccessibleTreeItem nodeId="1" label={"a Test 1"}>
			<AccessibleTreeItem nodeId="1-1" label={"a Test 1-1"} iconName={"Tag"} />
			<AccessibleTreeItem nodeId="1-2" label={"b Test 1-2"} />
			<AccessibleTreeItem nodeId="1-3" label={"c Test 1-3"} />
		</AccessibleTreeItem>
		<AccessibleTreeItem nodeId="2" label={"b Test 2"}>
			<AccessibleTreeItem nodeId="2-1" label={"a Test 2-1"} disabled={true}>
				<AccessibleTreeItem nodeId="2-1-1" label={"a Test 2-1-1"} />
				<AccessibleTreeItem nodeId="2-1-2" label={"b Test 2-1-2"} />
				<AccessibleTreeItem nodeId="2-1-3" label={"c Test 2-1-3"} />
			</AccessibleTreeItem>
			<AccessibleTreeItem nodeId="2-2" label={"b Test 2-2"} />
			<AccessibleTreeItem nodeId="2-3" label={"c Test 2-3"} />
		</AccessibleTreeItem>
	</AccessibleTreeView>
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
