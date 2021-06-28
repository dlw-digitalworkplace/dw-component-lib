import { act, renderHook } from "@testing-library/react-hooks";
import { useStateIfMounted } from "../../hooks";

describe("useStateIfMounted", () => {
	it("should update state when mounted", () => {
		const { result } = renderHook(() => useStateIfMounted(1));
		const [, setValue] = result.current;

		act(() => {
			setValue(2);
		});

		const [value] = result.current;

		expect(value).toEqual(2);
	});

	it("should not update state when unmounted", () => {
		const { result, unmount } = renderHook(() => useStateIfMounted(1));
		const [, setValue] = result.current;

		unmount();

		act(() => {
			setValue(2);
		});

		const [value] = result.current;

		expect(value).toEqual(1);
	});
});
