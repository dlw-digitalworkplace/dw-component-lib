import { storiesOf } from "@storybook/react";
import * as React from "react";
import { TreeItem } from "../TreeItem";
import { TreeView } from "./TreeView";

const treeData = [
	{
		id: 1,
		text: "Folder 1",
		children: [
			{
				id: 2,
				text: "Sub Folder 1",
				children: [
					{
						id: 5,
						text: "Sub Folder 3"
					},
					{
						id: 6,
						text: "Sub Folder 4"
					}
				]
			},
			{
				id: 3,
				text: "Sub Folder 2"
			}
		]
	},
	{
		id: 4,
		text: "Folder 2",
		children: []
	}
];

const TreeItemFromData = (data: any) => {
	return (
		<TreeItem key={data.id} nodeId={data.id.toString()} label={data.text}>
			{data.children && data.children.map((c: any) => TreeItemFromData(c))}
		</TreeItem>
	);
};

storiesOf("TreeView", module)
	.addParameters({ component: TreeView })
	.add("Basic", () => {
		return <TreeView>{treeData.map((d) => TreeItemFromData(d))}</TreeView>;
	});
