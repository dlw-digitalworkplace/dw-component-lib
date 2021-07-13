import * as React from "react";
import { useIsMounted } from "./useIsMounted";

/**
 * @public
 *
 * Returns a stateful value, and a function to update it.
 * Unlike the default React's useState function, this will only update state when the component is mounted.
 *
 * @param initialState - The initial value of the state.
 */
export function useStateIfMounted<T>(
	initialState?: T
): [T | undefined, (newValue: React.SetStateAction<T | undefined>) => void] {
	const isComponentMounted = useIsMounted();
	const [state, setState] = React.useState(initialState);

	const newSetState = (value: React.SetStateAction<T | undefined>) => {
		if (isComponentMounted.current) {
			setState(value);
		}
	};

	return [state, newSetState];
}
