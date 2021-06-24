import * as React from "react";
import { useIsMounted } from "./useIsMounted";

export const useStateIfMounted: <T>(initialState?: T) => [T | undefined, (newValue?: T) => void] = <T>(
	initialState?: T
) => {
	const isComponentMounted = useIsMounted();
	const [state, setState] = React.useState(initialState);

	const newSetState = (value: T | undefined) => {
		if (isComponentMounted.current) {
			setState(value);
		}
	};

	return [state, newSetState];
};
