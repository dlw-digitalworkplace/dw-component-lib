import * as React from "react";

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;
/**
 * @public
 *
 * Debounces a function call with the specified delay.
 *
 * @param func The original, non debounced function (You can pass any number of args to it).
 * @param delay The delay (in ms) for the function to return.
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms.
 */

export function useDebounceFn<Func extends SomeFunction>(func: Func, delay = 250) {
	const timer = React.useRef<Timer>();

	/**
	 * Clears the timer when unmounting the component.
	 */
	React.useEffect(() => {
		return () => {
			if (!timer.current) {
				return;
			}
			clearTimeout(timer.current);
		};
	}, []);

	const debouncedFunction = React.useCallback(
		(...args: any[]) => {
			const newTimer = setTimeout(() => {
				func(...args);
			}, delay);

			clearTimeout(timer.current!);
			timer.current = newTimer;
		},
		[delay, func]
	) as Func;

	return debouncedFunction;
}
