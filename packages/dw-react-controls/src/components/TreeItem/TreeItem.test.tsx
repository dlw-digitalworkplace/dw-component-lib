import { IRenderFunction } from "@fluentui/react";
import { fireEvent, queryByAttribute, render } from "@testing-library/react";
import * as React from "react";
import { TreeItem } from "../TreeItem";
import { TreeView } from "../TreeView";
import { ITreeItemContentProps } from "./TreeItemContent";

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

		it("should render custom itemContent when specified", () => {
			const onRenderItemContents: IRenderFunction<ITreeItemContentProps> = (props, defaultRender) => {
				return (
					<div>
						<span>TestHeader</span>
						{defaultRender && defaultRender(props)}
					</div>
				);
			};

			const { getByText } = render(
				<TreeView>
					<TreeItem nodeId="test" label="TestLabel" onRenderContent={onRenderItemContents} />
				</TreeView>
			);

			expect(getByText(/TestHeader/i)).toBeTruthy();
			expect(getByText(/TestLabel/i)).toBeTruthy();
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

		it("should not call onInvoke when children are doubleClicked", () => {
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

			const { container } = render(
				<TreeView>
					<TreeItem nodeId="one" label="one" onClick={handleClick}>
						<TreeItem nodeId="two" label="two" />
					</TreeItem>
				</TreeView>
			);

			const expandIcon = queryByAttribute("data-icon-name", container, /ChevronRightSmall/i);
			fireEvent.click(expandIcon!);

			expect(handleClick).not.toBeCalled();
		});
	});

	describe("Expansion", () => {
		it("should expand a node with children", () => {
			const { container, getAllByRole } = render(
				<TreeView>
					<TreeItem nodeId="one" label="one" data-testid="one">
						<TreeItem nodeId="two" label="two" data-testid="two" />
					</TreeItem>
				</TreeView>
			);

			expect(getAllByRole(/treeitem/i).length).toBe(1);

			const expandIcon = queryByAttribute("data-icon-name", container, /ChevronRightSmall/i);
			fireEvent.click(expandIcon!);

			expect(getAllByRole(/treeitem/i).length).toBe(2);
		});

		it("should collapse a node with children", () => {
			const { container, getAllByRole } = render(
				<TreeView defaultExpanded={["one"]}>
					<TreeItem nodeId="one" label="one" data-testid="one">
						<TreeItem nodeId="two" label="two" data-testid="two" />
					</TreeItem>
				</TreeView>
			);

			expect(getAllByRole(/treeitem/i).length).toBe(2);

			const expandIcon = queryByAttribute("data-icon-name", container, /ChevronDownSmall/i);
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
