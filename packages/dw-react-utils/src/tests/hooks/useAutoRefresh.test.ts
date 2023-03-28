import { act, renderHook } from "@testing-library/react-hooks";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";

describe("useAutoRefresh", () => {
	it("should call function after refreshDelay seconds", async () => {
		jest.useFakeTimers();

		const callbackMock = jest.fn(() => Promise.resolve());
		const refreshDelay = 5; // 1 second

		const { rerender } = renderHook(() => useAutoRefresh(callbackMock, refreshDelay));

		await act(async () => {
			await Promise.resolve(); // wait for the next tick
			rerender();
		});

		expect(callbackMock).toHaveBeenCalledTimes(1);

		await act(async () => {
			jest.advanceTimersByTime((refreshDelay - 1) * 1000);
			await Promise.resolve(); // wait for the next tick
			rerender();
		});

		expect(callbackMock).toHaveBeenCalledTimes(1);

		await act(async () => {
			jest.advanceTimersByTime(refreshDelay * 1000);
			await Promise.resolve(); // wait for the next tick
			rerender();
		});

		expect(callbackMock).toHaveBeenCalledTimes(2);
	});

	it("should call onError callback when there is an error", async () => {
		jest.useFakeTimers();

		const callbackMock = jest.fn(() => Promise.reject(new Error("Fetch error")));
		const onErrorMock = jest.fn();
		const refreshDelay = 1; // 1 second

		const { rerender } = renderHook(() => useAutoRefresh(callbackMock, refreshDelay, onErrorMock));

		await act(async () => {
			await Promise.resolve(); // wait for the next tick
			rerender();
		});

		expect(callbackMock).toHaveBeenCalledTimes(1);
		expect(onErrorMock).toHaveBeenCalledTimes(1);
		expect(onErrorMock).toHaveBeenCalledWith(new Error("Fetch error"));
	});

	it("should cancel the timeout when unmounting", async () => {
		jest.useFakeTimers();
		const clearTimeoutMock = jest.spyOn(window, "clearTimeout");
		const { unmount, rerender } = renderHook(() => useAutoRefresh(() => Promise.resolve(), 1));

		await act(async () => {
			await Promise.resolve(); // wait for the next tick
			rerender();
			unmount();
		});

		expect(clearTimeoutMock).toHaveBeenCalledTimes(1);
		expect(clearTimeoutMock).toHaveBeenCalledWith(expect.any(Number));
	});
});
