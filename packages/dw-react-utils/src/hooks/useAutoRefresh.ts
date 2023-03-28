import { useEffect, useRef } from "react";

/**
 * Hook that automatically refreshes data on an interval.
 *
 * @template T The type of the data being fetched.
 * @param {() => void | Promise<void>} callback The function that needs to be called.
 * @param {number} refreshDelay The time delay **in seconds** between data refreshes.
 * @param {(error: Error) => void} onError Optional callback for handling errors.
 */
export function useAutoRefresh<T>(
	callback: () => void | Promise<void>,
	refreshDelay: number,
	onError?: (error: Error) => void
): void {
	const callbackRef = useRef(callback);
	const timeoutIdRef = useRef<NodeJS.Timeout | number | null>(null);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const executeCallback = async () => {
			try {
				await callbackRef.current();
			} catch (error) {
				if (onError) {
					onError(error);
				}
			}

			timeoutIdRef.current = setTimeout(executeCallback, refreshDelay * 1000);
		};

		// Fetch and set the data, and schedule the next data refresh.
		executeCallback();

		// Clear the timeout when the component unmounts.
		return () => {
			if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current);
			}
		};
	}, [refreshDelay, onError]);
}
