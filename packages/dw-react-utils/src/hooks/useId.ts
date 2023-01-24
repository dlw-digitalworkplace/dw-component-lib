import * as React from "react";

let globalId = 0;

const maybeReactUseId: undefined | (() => string) = (React as any)["useId" + ""];

const useGlobalId = (idOverride?: string): string | undefined => {
	const [defaultId, setDefaultId] = React.useState(idOverride);
	const id = idOverride || defaultId;

	React.useEffect(() => {
		if (!defaultId) {
			// Fallback to this default id when possible.
			// Use the incrementing value for client-side rendering only.
			// We can't use it server-side.
			// If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
			globalId += 1;
			setDefaultId(`dw-${globalId}`);
		}
	}, [defaultId]);

	return id;
};

/**
 * Creates a globally unique ID for a component.
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
export const useId = (idOverride?: string): string | undefined => {
	if (maybeReactUseId !== undefined) {
		const reactId = maybeReactUseId();
		return idOverride ?? reactId;
	}

	return useGlobalId(idOverride);
};
