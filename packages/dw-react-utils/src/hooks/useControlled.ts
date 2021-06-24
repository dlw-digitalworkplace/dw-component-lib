import * as React from "react";

export const useControlled: <T>(
	controlled: T,
	defaultProp: T,
	name: string,
	state?: string
) => [T, (newValue: React.SetStateAction<T>) => void] = <T>(
	controlled: T,
	defaultProp: T,
	name: string,
	state: string = "value"
) => {
	const { current: isControlled } = React.useRef(controlled !== undefined);
	const [valueState, setValue] = React.useState(defaultProp);
	const value = isControlled ? controlled : valueState;

	if (process.env.NODE_ENV !== "production") {
		React.useEffect(() => {
			if (isControlled !== (controlled !== undefined)) {
				console.error(
					[
						`A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${
							isControlled ? "un" : ""
						}controlled.`,
						"Elements should not switch from uncontrolled to controlled (or vice versa).",
						`Decide between using a controlled or uncontrolled ${name} ` + "element for the lifetime of the component.",
						"The nature of the state is determined during the first render, it's considered controlled if the value is not `undefined`.",
						"More info: https://fb.me/react-controlled-components"
					].join("\n")
				);
			}
		}, [controlled]);

		const { current: defaultValue } = React.useRef(defaultProp);

		React.useEffect(() => {
			if (!isControlled && defaultValue !== defaultProp) {
				console.error(
					[
						`A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. ` +
							`To suppress this warning opt to use a controlled ${name}.`
					].join("\n")
				);
			}
		}, [JSON.stringify(defaultProp)]);
	}

	const setValueIfUncontrolled = React.useCallback((newValue: React.SetStateAction<T>) => {
		if (!isControlled) {
			setValue(newValue);
		}
	}, []);

	return [value, setValueIfUncontrolled];
};
