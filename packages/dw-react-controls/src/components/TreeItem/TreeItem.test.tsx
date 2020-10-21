import { fireEvent, queryByAttribute, render } from "@testing-library/react";
import * as React from "react";
import { TreeView } from "../TreeView";
import { TreeItem } from "./TreeItem";

describe("<TreeItem />", () => {
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

	describe("Events", () => {
		it("should call onClick when clicked", () => {
			const handleClick = jest.fn();

			const { getByText } = render(
				<TreeView>
					<TreeItem nodeId="test" label="test" onClick={handleClick} />
				</TreeView>
			);

			fireEvent.click(getByText("test"));

			expect(handleClick).toBeCalledTimes(1);
		});

		it("should call onInvoke when doubleClicked", () => {
			const handleDoubleClick = jest.fn();

			const { getByText } = render(
				<TreeView>
					<TreeItem nodeId="test" label="test" onInvoke={handleDoubleClick} />
				</TreeView>
			);

			fireEvent.doubleClick(getByText("test"));

			expect(handleDoubleClick).toBeCalledTimes(1);
		});

		it("should not call onClick when children are clicked", () => {
			const handleClick = jest.fn();

			const { getByText } = render(
				<TreeView defaultExpanded={["one"]}>
					<TreeItem nodeId="one" label="one" onClick={handleClick}>
						<TreeItem nodeId="two" label="two" />
					</TreeItem>
				</TreeView>
			);

			fireEvent.click(getByText("two"));

			expect(handleClick).not.toBeCalled();
		});

		it("should not call onClick when children are doubleClicked", () => {
			const handleDoubleClick = jest.fn();

			const { getByText } = render(
				<TreeView defaultExpanded={["one"]}>
					<TreeItem nodeId="one" label="one" onInvoke={handleDoubleClick}>
						<TreeItem nodeId="two" label="two" />
					</TreeItem>
				</TreeView>
			);

			fireEvent.doubleClick(getByText("two"));

			expect(handleDoubleClick).not.toBeCalled();
		});

		it("should not call onClick when expand icon is clicked", () => {
			const handleClick = jest.fn();

			const component = render(
				<TreeView>
					<TreeItem nodeId="one" label="one" onClick={handleClick}>
						<TreeItem nodeId="two" label="two" />
					</TreeItem>
				</TreeView>
			);

			const expandIcon = queryByAttribute("data-icon-name", component.baseElement, /ChevronRightSmall/i);
			fireEvent.click(expandIcon!);

			expect(handleClick).not.toBeCalled();
		});
	});

	describe("Expansion", () => {
		it("should expand a node with children", () => {
			const component = render(
				<TreeView>
					<TreeItem nodeId="one" label="one" data-testid="one">
						<TreeItem nodeId="two" label="two" data-testid="two" />
					</TreeItem>
				</TreeView>
			);
			const { getAllByRole } = component;

			expect(getAllByRole(/treeitem/i).length).toBe(1);

			const expandIcon = queryByAttribute("data-icon-name", component.baseElement, /ChevronRightSmall/i);
			fireEvent.click(expandIcon!);

			expect(getAllByRole(/treeitem/i).length).toBe(2);
		});

		it("should collapse a node with children", () => {
			const component = render(
				<TreeView defaultExpanded={["one"]}>
					<TreeItem nodeId="one" label="one" data-testid="one">
						<TreeItem nodeId="two" label="two" data-testid="two" />
					</TreeItem>
				</TreeView>
			);
			const { getAllByRole } = component;

			expect(getAllByRole(/treeitem/i).length).toBe(2);

			const expandIcon = queryByAttribute("data-icon-name", component.baseElement, /ChevronDownSmall/i);
			fireEvent.click(expandIcon!);

			expect(getAllByRole(/treeitem/i).length).toBe(1);
		});
	});

	describe("Selection", () => {
		it("should select a node when clicked", () => {
			const { getByRole, getByText } = render(
				<TreeView>
					<TreeItem nodeId="test" label="test" />
				</TreeView>
			);

			expect(getByRole(/treeitem/i).getAttribute("aria-selected")).toBe("false");

			fireEvent.click(getByText("test"));

			expect(getByRole(/treeitem/i).getAttribute("aria-selected")).toBe("true");
		});
	});

	describe("Selection", () => {
		it("should not select a disabled node when clicked", () => {
			const { getByRole, getByText } = render(
				<TreeView>
					<TreeItem nodeId="test" label="test" disabled={true} />
				</TreeView>
			);

			expect(getByRole(/treeitem/i).getAttribute("aria-selected")).toBe("false");

			fireEvent.click(getByText("test"));

			expect(getByRole(/treeitem/i).getAttribute("aria-selected")).toBe("false");
		});
	});
});