import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { TermAdder } from "./TermAdder";

describe("<TermAdder />", () => {
	describe("Rendering", () => {
		it("should render without crashing", async () => {
			const { container } = render(<TermAdder />);

			expect(container.querySelector("input[type='Text']")).toBeTruthy();
		});
	});

	describe("Events", () => {
		it("should show error when submitting empty value", async () => {
			const handleSubmit = jest.fn();

			const { container } = render(<TermAdder onSubmit={handleSubmit} />);

			const input = container.getElementsByTagName("input")[0];
			const form = container.getElementsByTagName("form")[0];

			fireEvent.change(input, { target: { value: "" } });
			fireEvent.submit(form);

			expect(await screen.findByText("Please enter a value.")).toBeTruthy();
			expect(handleSubmit).toBeCalledTimes(0);
		});

		it("should call onSubmit when submitting form", async () => {
			const handleSubmit = jest.fn();

			const { container } = render(<TermAdder onSubmit={handleSubmit} />);

			const input = container.getElementsByTagName("input")[0];
			const form = container.getElementsByTagName("form")[0];

			const inputValue = "Test value";

			fireEvent.change(input, { target: { value: inputValue } });
			fireEvent.submit(form);

			waitFor(
				() => {
					// make sure form submission is complete
				},
				{ container }
			);

			expect(handleSubmit).toBeCalledTimes(1);
			expect(handleSubmit).toBeCalledWith(inputValue);
		});
	});
});
