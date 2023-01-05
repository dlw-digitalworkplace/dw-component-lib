import { IRenderFunction } from "@fluentui/react";

export function composeRenderFunction<T>(outer: IRenderFunction<T>, inner: IRenderFunction<T>): IRenderFunction<T> {
	return (outerProps?: T, defaultRender?: IRenderFunction<T>) => {
		return outer(outerProps, defaultRender ? defaultRender : inner);
	};
}
