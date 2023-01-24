import { useEffect, useState } from "react";

/**
 * @public
 *
 * Debounces changing of the inner value with a specified delay.
 *
 * @param value The original, non debounced value to set.
 * @param delay The delay (in ms) for the function to return.
 */
export function useDebounce<T>(value: T, delay?: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay || 500);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}
