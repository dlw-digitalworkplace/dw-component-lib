import { render } from "@testing-library/react";
import { DefaultButton, IRenderFunction } from "office-ui-fabric-react";
import * as React from "react";
import { ITermValue } from "../TermPicker";
import { MockTaxonomyProvider } from "./providers/MockTaxonomyProvider";
import { TaxonomyPicker } from "./TaxonomyPicker";
import { ITaxonomyPickerDialogButtonProps } from "./TaxonomyPicker.types";

const mockProvider = new MockTaxonomyProvider();

describe("<TaxonomyPicker />", () => {
	describe("Rendering", () => {
		it("should render without crashing when empty", () => {
			const handleChange = jest.fn();

			const { container } = render(
				<TaxonomyPicker provider={mockProvider} selectedItems={[]} onChange={handleChange} />
			);

			expect(container.getElementsByClassName("dw-TaxonomyPicker").length).toBe(1);
		});

		it("should render selected terms", () => {
			const handleChange = jest.fn();
			const selectedItems: ITermValue[] = [
				{ key: "TERM_1", name: "Term 1" },
				{ key: "TERM_2", name: "Term 2" },
				{ key: "TERM_3", name: "Term 3" }
			];

			const { getByText } = render(
				<TaxonomyPicker provider={mockProvider} selectedItems={selectedItems} onChange={handleChange} />
			);

			expect(getByText(/Term 1/i)).toBeTruthy();
			expect(getByText(/Term 2/i)).toBeTruthy();
			expect(getByText(/Term 3/i)).toBeTruthy();
		});

		it("should render the default dialog button", () => {
			const handleChange = jest.fn();

			const { container } = render(
				<TaxonomyPicker provider={mockProvider} selectedItems={[]} onChange={handleChange} />
			);

			expect(container.getElementsByTagName("button").length).toBe(1);
		});

		it("should apply custom rendering to the dialog button", () => {
			const handleChange = jest.fn();
			const onRenderOpenDialogButton: IRenderFunction<ITaxonomyPickerDialogButtonProps> = (props, defaultRender) => {
				return <DefaultButton onClick={props?.onButtonClick}>Custom button</DefaultButton>;
			};

			const { getByText } = render(
				<TaxonomyPicker
					provider={mockProvider}
					selectedItems={[]}
					onChange={handleChange}
					onRenderOpenDialogButton={onRenderOpenDialogButton}
				/>
			);

			expect(getByText(/Custom button/i)).toBeTruthy();
		});
	});
});
