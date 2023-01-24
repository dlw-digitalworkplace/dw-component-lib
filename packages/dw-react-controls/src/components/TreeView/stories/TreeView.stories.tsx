import { DefaultButton } from "@fluentui/react";
import { Story, StoryContext } from "@storybook/react";
import * as React from "react";
import { TreeItem } from "../../TreeItem";
import { TreeView } from "../TreeView";
import { ITreeViewProps } from "../TreeView.types";

const Template: Story<ITreeViewProps> = ({ ...args }) => (
	<TreeView {...args}>
		<TreeItem nodeId={"Parent 1"} label={"Parent 1"}>
			<TreeItem nodeId={"Child 1"} label={"Child 1"}>
				<TreeItem nodeId={"Grandchild 1"} label={"Grandchild 1"} />
				<TreeItem nodeId={"Grandchild 2"} label={"Grandchild 2"} />
			</TreeItem>
			<TreeItem nodeId={"Child 2"} label={"Child 2"} />
		</TreeItem>
		<TreeItem nodeId={"Parent 2"} label={"Parent 2"} />
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

export const AdvancedUncontrolled: Story<ITreeViewProps> = ({ defaultExpanded, defaultSelected, ...args }) => (
	<TreeView {...args} defaultExpanded={["Parent 1", "Child 1"]} defaultSelected={"Grandchild 2"}>
		<TreeItem nodeId={"Parent 1"} label={"Parent 1"}>
			<TreeItem nodeId={"Child 1"} label={"Child 1"}>
				<TreeItem nodeId={"Grandchild 1"} label={"Grandchild 1"} />
				<TreeItem nodeId={"Grandchild 2"} label={"Grandchild 2"} />
			</TreeItem>
			<TreeItem nodeId={"Child 2"} label={"Child 2"} />
		</TreeItem>
		<TreeItem nodeId={"Parent 2"} label={"Parent 2"} />
	</TreeView>
);
AdvancedUncontrolled.argTypes = { ...defaultArgTypes };
AdvancedUncontrolled.args = {};
AdvancedUncontrolled.parameters = { docs: { source: { type: "code" } } };

export const AdvancedControlled = (
	{ expanded: expandedProp, selected: selectedProp, ...args }: Partial<ITreeViewProps>,
	context: StoryContext
) => {
	const [expanded, setExpanded] = React.useState<string[]>([]);
	const [selected, setSelected] = React.useState<string | null>(null);

	// Changes selection when prop changes
	React.useEffect(() => {
		setSelected(selectedProp!);
	}, [selectedProp]);

	// Changes expansion when prop changes
	React.useEffect(() => {
		setExpanded(expandedProp!);
	}, [expandedProp]);

	// Callback for managing controlled selection state
	const onNodeSelect = (event: React.ChangeEvent<{}>, nodeId?: string): void => {
		setSelected(nodeId!);
	};

	// Callback for managing controlled expansion state
	const onNodeToggle = (event: React.ChangeEvent<{}>, nodeIds?: string[]): void => {
		setExpanded(nodeIds!);
	};

	const collapseAll = () => {
		setExpanded([]);
	};

	const selectParent1 = () => {
		setSelected("Parent 1");
	};

	return (
		<div>
			<p>
				<DefaultButton onClick={collapseAll}>Collapse all</DefaultButton>
				<DefaultButton onClick={selectParent1}>Select 'Parent 1'</DefaultButton>
			</p>

			<TreeView
				{...args}
				expanded={expanded}
				selected={selected}
				onNodeSelect={onNodeSelect}
				onNodeToggle={onNodeToggle}
			>
				<TreeItem nodeId={"Parent 1"} label={"Parent 1"}>
					<TreeItem nodeId={"Child 1"} label={"Child 1"}>
						<TreeItem nodeId={"Grandchild 1"} label={"Grandchild 1"} />
						<TreeItem nodeId={"Grandchild 2"} label={"Grandchild 2"} />
					</TreeItem>
					<TreeItem nodeId={"Child 2"} label={"Child 2"} />
				</TreeItem>
				<TreeItem nodeId={"Parent 2"} label={"Parent 2"} />
			</TreeView>
			<hr />
			<small>
				Currently selected: {selected || "(none)"}
				<br />
				Currently expanded: {expanded.length > 0 ? expanded.join(", ") : "(none)"}
			</small>
		</div>
	);
};
AdvancedControlled.argTypes = {
	...defaultArgTypes,
	expanded: { control: "array" },
	selected: { control: "text" }
};
AdvancedControlled.args = { selected: "Parent 1", expanded: ["Parent 1"] };
AdvancedControlled.parameters = { docs: { source: { type: "code" } } };
