import { act, renderHook } from "@testing-library/react-hooks";
import { useControlled } from "../../hooks";

describe("useControlled", () => {
	it("should update state when uncontrolled", () => {
		const { result } = renderHook(() => useControlled(undefined, 1, "TestComponent"));
		const [, setValue] = result.current;

		act(() => {
			setValue(2);
		});

		const [value] = result.current;

		expect(value).toEqual(2);
	});

	it("should not update state when controlled", () => {
		const { result } = renderHook(() => useControlled(1, undefined, "TestComponent"));
		const [, setValue] = result.current;

		act(() => {
			setValue(2);
		});

		const [value] = result.current;

		expect(value).toEqual(1);
	});

	describe("warnings", () => {
		beforeEach(() => {
			jest.spyOn(console, "error");
			// @ts-ignore jest.spyOn adds this functionallity
			console.error.mockImplementation(() => null);
		});

		afterEach(() => {
			// @ts-ignore jest.spyOn adds this functionallity
			console.error.mockRestore();
		});

		it("should warn when updating uncontrolled value through props", () => {
			const errorFunc = jest.spyOn(console, "error");

			let uncontrolled = 1;
			const { result, rerender } = renderHook(() => useControlled(undefined, uncontrolled, "TestComponent"));

			uncontrolled = 2;
			rerender();

			const [value] = result.current;

			expect(errorFunc).toHaveBeenCalledWith(
				expect.stringMatching("A component is changing the default value state of an uncontrolled")
			);
			expect(value).toEqual(1);
		});

		it("should warn when changing from uncontrolled to controlled", () => {
			const errorFunc = jest.spyOn(console, "error");

			let controlled: number | undefined = undefined;
			const uncontrolled: number = 1;

			const { result, rerender } = renderHook(() => useControlled(controlled, uncontrolled, "TestComponent"));

			controlled = 2;
			rerender();

			const [value] = result.current;

			expect(errorFunc).toHaveBeenCalledWith(
				expect.stringMatching("Elements should not switch from uncontrolled to controlled")
			);
			expect(value).toEqual(1);
		});
	});
});
