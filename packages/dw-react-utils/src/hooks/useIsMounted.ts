import * as React from "react";

/**
 * @public
 *
 * Keeps a reference to the mounted state of the current component.
 */
export function useIsMounted(): React.MutableRefObject<boolean> {
	const isMounted = React.useRef(false);

	React.useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	return isMounted;
}
