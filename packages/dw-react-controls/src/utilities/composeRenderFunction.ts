import { IRenderFunction } from "office-ui-fabric-react";

export function composeRenderFunction<T>(outer: IRenderFunction<T>, inner: IRenderFunction<T>): IRenderFunction<T> {
	return (outerProps?: T, defaultRender?: IRenderFunction<T>) => {
		return outer(outerProps, defaultRender ? defaultRender : inner);
	};
}
