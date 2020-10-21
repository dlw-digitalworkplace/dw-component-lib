import { storiesOf } from "@storybook/react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
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

storiesOf("TreeView", module)
	.addParameters({ component: TreeView })
	.add("Basic", () => {
		const TreeItemFromData = (data: any) => {
			return (
				<TreeItem key={data.id} nodeId={data.id.toString()} label={data.text} iconName="Tag">
					{data.children && data.children.map((c: any) => TreeItemFromData(c))}
				</TreeItem>
			);
		};

		return <TreeView>{treeData.map((d) => TreeItemFromData(d))}</TreeView>;
	})
	.add("Custom rendering", () => {
		const TreeItemFromData = (data: any) => {
			return (
				<TreeItem
					key={data.id}
					nodeId={data.id.toString()}
					label={data.text}
					iconName="Tag"
					onRenderItemContents={(props, defaultRender) => (
						<div style={{ display: "flex", alignItems: "center" }}>
							<Icon iconName="MoreVertical" style={{ fontSize: "1.25rem" }} />
							{defaultRender && defaultRender(props)}
						</div>
					)}
				>
					{data.children && data.children.map((c: any) => TreeItemFromData(c))}
				</TreeItem>
			);
		};

		return <TreeView>{treeData.map((d) => TreeItemFromData(d))}</TreeView>;
	});
