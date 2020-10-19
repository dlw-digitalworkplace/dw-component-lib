import { fireEvent, queryByAttribute, render } from "@testing-library/react";
import * as React from "react";
import { TreeItem } from "../TreeItem";
import { TreeView } from "./TreeView";

describe("<TreeView />", () => {
	describe("Rendering", () => {
		it("should render without crashing", () => {
			const { getByText } = render(
				<TreeView>
					<TreeItem nodeId="test" label="test" />
				</TreeView>
			);

			expect(getByText(/test/i)).toBeTruthy();
		});
	});

	describe("Selection", () => {
		it("should change controlled selection", () => {
			let selected: string | undefined = undefined;
			const onNodeSelect = (ev: React.SyntheticEvent, nodeId: string) => {
				selected = nodeId;
			};

			const { getByText } = render(
				<TreeView selected={selected} onNodeSelect={onNodeSelect}>
					<TreeItem nodeId="test" label="test" />
				</TreeView>
			);

			expect(selected).toBeUndefined();

			fireEvent.click(getByText("test"));

			expect(selected).toBe("test");
		});
	});

	describe("Expansion", () => {
		it("should change controlled expansion", () => {
			let expanded: string[] | undefined = [];
			const onNodeToggle = (ev: React.SyntheticEvent, nodeIds: string[]) => {
				expanded = nodeIds;
			};

			const component = render(
				<TreeView expanded={expanded} onNodeToggle={onNodeToggle}>
					<TreeItem nodeId="one" label="one" data-testid="one">
						<TreeItem nodeId="two" label="two" data-testid="two" />
					</TreeItem>
				</TreeView>
			);

			expect(expanded.length).toBe(0);

			const expandIcon = queryByAttribute("data-icon-name", component.baseElement, /ChevronRightSmall/i);
			fireEvent.click(expandIcon!);

			expect(expanded.length).toBe(1);
		});
	});
});
