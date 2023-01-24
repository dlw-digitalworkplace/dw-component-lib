import * as React from "react";

function setRef<T>(
	ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
	value: T | null
): void {
	if (typeof ref === "function") {
		ref(value);
	} else if (ref) {
		ref.current = value;
	}
}

export const useForkRef = <InstanceA, InstanceB>(
	refA: React.Ref<InstanceA> | null | undefined,
	refB: React.Ref<InstanceB> | null | undefined
): React.Ref<InstanceA & InstanceB> | null => {
	/**
	 * This will create a new function if the ref props change and are defined.
	 * This means react will call the old forkRef with `null` and the new forkRef
	 * with the ref. Cleanup naturally emerges from this behavior.
	 */
	return React.useMemo(() => {
		if (refA === null && refB === null) {
			return null;
		}
		return (refValue) => {
			setRef(refA, refValue);
			setRef(refB, refValue);
		};
	}, [refA, refB]);
};
