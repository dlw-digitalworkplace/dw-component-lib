import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { ITerm } from "../../models";
import { MockTaxonomyProvider } from "./providers";
import { TaxonomyPickerDialog } from "./TaxonomyPickerDialog";

const mockTaxonomyProvider = new MockTaxonomyProvider();
const onResolveSuggestions = async (filter: string, currentSelection?: ITerm[]): Promise<ITerm[]> => {
	const availableItems = await mockTaxonomyProvider.getTerms();

	return availableItems
		.filter((it) => it.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)
		.filter((it) => !currentSelection?.some((si) => si.key === it.key));
};

describe("<TaxonomyPickerDialog />", () => {
	describe("Rendering", () => {
		it("should render without crashing", async () => {
			render(
				<TaxonomyPickerDialog
					provider={mockTaxonomyProvider}
					hidden={false}
					pickerProps={{ onResolveSuggestions: onResolveSuggestions }}
				/>
			);

			expect(await screen.findByText(/Add/i)).toBeTruthy();
		});

		it("should render without crashing when allowing adding of terms", async () => {
			render(
				<TaxonomyPickerDialog
					provider={mockTaxonomyProvider}
					hidden={false}
					pickerProps={{ onResolveSuggestions: onResolveSuggestions }}
					allowAddingTerms={true}
				/>
			);

			expect(await screen.findByText(/Add/i)).toBeTruthy();
		});

		it("should be able to render custom labels", async () => {
			render(
				<TaxonomyPickerDialog
					provider={mockTaxonomyProvider}
					hidden={false}
					pickerProps={{ onResolveSuggestions: onResolveSuggestions }}
					labels={{
						addButton: "TestAdd",
						cancelButton: "TestCancel",
						okButton: "TestOk"
					}}
				/>
			);

			expect(await screen.findByText(/TestAdd/i)).toBeTruthy();
			expect(await screen.findByText(/TestCancel/i)).toBeTruthy();
			expect(await screen.findByText(/TestOk/i)).toBeTruthy();
		});
	});

	describe("Events", () => {
		it("should call onConfirm when clicking OK", async () => {
			const handleConfirm = jest.fn();

			render(
				<TaxonomyPickerDialog
					provider={mockTaxonomyProvider}
					hidden={false}
					pickerProps={{ onResolveSuggestions: onResolveSuggestions }}
					onConfirm={handleConfirm}
				/>
			);

			fireEvent.click(await screen.findByText("OK"));

			expect(handleConfirm).toBeCalledTimes(1);
		});

		it("should call onDismiss when clicking OK", async () => {
			const handleDismiss = jest.fn();

			render(
				<TaxonomyPickerDialog
					provider={mockTaxonomyProvider}
					hidden={false}
					pickerProps={{ onResolveSuggestions: onResolveSuggestions }}
					onDismiss={handleDismiss}
				/>
			);

			fireEvent.click(await screen.findByText("OK"));

			expect(handleDismiss).toBeCalledTimes(1);
		});

		it("should call onDismiss when clicking Cancel", async () => {
			const handleDismiss = jest.fn();

			render(
				<TaxonomyPickerDialog
					provider={mockTaxonomyProvider}
					hidden={false}
					pickerProps={{ onResolveSuggestions: onResolveSuggestions }}
					onDismiss={handleDismiss}
				/>
			);

			fireEvent.click(await screen.findByText("Cancel"));

			expect(handleDismiss).toBeCalledTimes(1);
		});
	});

	describe("Selection", () => {
		it("should update selection when adding from TreeView", async () => {
			const handleConfirm = jest.fn();

			render(
				<TaxonomyPickerDialog
					provider={mockTaxonomyProvider}
					hidden={false}
					pickerProps={{ onResolveSuggestions: onResolveSuggestions }}
					onConfirm={handleConfirm}
				/>
			);

			fireEvent.doubleClick(await screen.findByText("My term B"));
			fireEvent.click(await screen.findByText("OK"));

			expect(handleConfirm).toBeCalledWith(expect.arrayContaining([expect.objectContaining({ name: "My term B" })]));
		});

		it("should update selection when adding with Add button", async () => {
			const handleConfirm = jest.fn();

			render(
				<TaxonomyPickerDialog
					provider={mockTaxonomyProvider}
					hidden={false}
					pickerProps={{ onResolveSuggestions: onResolveSuggestions }}
					onConfirm={handleConfirm}
				/>
			);

			fireEvent.click(await screen.findByText("My term B"));
			fireEvent.click(await screen.findByText("Add"));
			fireEvent.click(await screen.findByText("OK"));

			expect(handleConfirm).toBeCalledWith(expect.arrayContaining([expect.objectContaining({ name: "My term B" })]));
		});
	});
});
