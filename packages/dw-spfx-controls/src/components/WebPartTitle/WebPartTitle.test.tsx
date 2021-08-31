import { DisplayMode } from "@microsoft/sp-core-library";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { WebPartTitle } from "./WebPartTitle";

describe("<WebPartTitle />", () => {
	describe("Rendering", () => {
		it("should render in display mode without crashing", () => {
			const handleUpdate = jest.fn();
			const { getByTestId, queryByTestId } = render(
				<WebPartTitle displayMode={DisplayMode.Read} title={"Test title"} onUpdate={handleUpdate} />
			);

			expect(queryByTestId("input")).toBeNull();

			expect(queryByTestId("title")).toBeTruthy();
			expect(getByTestId("title").textContent).toBe("Test title");
		});

		it("should render in edit mode without crashing", () => {
			const handleUpdate = jest.fn();
			const { getByTestId, queryByTestId } = render(
				<WebPartTitle displayMode={DisplayMode.Edit} title={"Test title"} onUpdate={handleUpdate} />
			);

			expect(queryByTestId("title")).toBeNull();

			expect(queryByTestId("input")).toBeTruthy();
			expect(getByTestId("input").textContent).toBe("Test title");
		});

		it("should hide title in display mode when hidden is set to true", () => {
			const handleUpdate = jest.fn();
			const { queryByTestId } = render(
				<WebPartTitle displayMode={DisplayMode.Read} hidden={true} title={"Test title"} onUpdate={handleUpdate} />
			);

			expect(queryByTestId("input")).toBeNull();
			expect(queryByTestId("title")).toBeNull();
		});

		it("should not hide title in edit mode when hidden is set to true", () => {
			const handleUpdate = jest.fn();
			const { queryByTestId } = render(
				<WebPartTitle displayMode={DisplayMode.Edit} hidden={true} title={"Test title"} onUpdate={handleUpdate} />
			);

			expect(queryByTestId("input")).toBeTruthy();
		});

		it("should hide title in display mode when not set", () => {
			const handleUpdate = jest.fn();
			const { queryByTestId } = render(
				<WebPartTitle displayMode={DisplayMode.Read} title={""} onUpdate={handleUpdate} />
			);

			expect(queryByTestId("input")).toBeNull();
			expect(queryByTestId("title")).toBeNull();
		});

		it("should not hide title in edit mode when not set", () => {
			const handleUpdate = jest.fn();
			const { queryByTestId } = render(
				<WebPartTitle displayMode={DisplayMode.Edit} title={""} onUpdate={handleUpdate} />
			);

			expect(queryByTestId("input")).toBeTruthy();
		});
	});

	describe("Events", () => {
		it("should call onUpdate when changing the title", () => {
			const handleUpdate = jest.fn();
			const { getByTestId } = render(
				<WebPartTitle displayMode={DisplayMode.Edit} title={"Test title"} onUpdate={handleUpdate} />
			);

			const textarea = getByTestId("input");

			userEvent.clear(textarea);
			userEvent.type(textarea, "Changed title");

			expect(handleUpdate).toHaveBeenCalled();
			expect(handleUpdate).toHaveBeenCalledWith("Changed title");
		});
	});
});
