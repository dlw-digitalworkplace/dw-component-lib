import { renderHook } from "@testing-library/react-hooks";
import { useDebounceFn } from "../../hooks/useDebounceFn";

describe("useDebounceFn", () => {
	it("should only call function after delay", () => {
		jest.useFakeTimers();

		const func = jest.fn();
		const { result } = renderHook(() => useDebounceFn(func, 500));

		result.current();

		jest.advanceTimersByTime(499);

		expect(func).not.toBeCalled();

		result.current();
		result.current();

		expect(func).not.toBeCalled();

		jest.runAllTimers();

		expect(func).toBeCalled();
		expect(func).toHaveBeenCalledTimes(1);
	});
});
