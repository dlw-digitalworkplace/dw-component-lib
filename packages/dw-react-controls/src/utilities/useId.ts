import * as React from "react";

let globalId = 0;

function useGlobalId(idOverride?: string): string | undefined {
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
}

const maybeReactUseId: undefined | (() => string) = (React as any)["useId" + ""];
/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
export default function useId(idOverride?: string): string | undefined {
	if (maybeReactUseId !== undefined) {
		const reactId = maybeReactUseId();
		return idOverride ?? reactId;
	}

	return useGlobalId(idOverride);
}
