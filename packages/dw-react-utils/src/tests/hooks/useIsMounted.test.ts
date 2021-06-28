import { renderHook } from "@testing-library/react-hooks";
import { useIsMounted } from "../../hooks";

describe("useIsMounted", () => {
	it("should return true when mounted", () => {
		const { result } = renderHook(() => useIsMounted());

		expect(result.current).toEqual({ current: true });
	});

	it("should return false when unmounted", () => {
		const { result, unmount } = renderHook(() => useIsMounted());

		unmount();

		expect(result.current).toEqual({ current: false });
	});
});
