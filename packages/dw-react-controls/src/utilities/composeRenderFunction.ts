import { IRenderFunction } from "@fluentui/react";

/**
 * @deprecated Use `composeRenderFunction` from `@fluentui/react` instead.
 */
export function composeRenderFunction2<T>(outer: IRenderFunction<T>, inner: IRenderFunction<T>): IRenderFunction<T> {
	return (outerProps?: T, defaultRender?: IRenderFunction<T>) => {
		return outer(outerProps, defaultRender ? defaultRender : inner);
	};
}
