import { Story } from "@storybook/react";
import * as React from "react";
import { useDebounceFn } from "../../hooks/useDebounceFn";

export const Basic: Story = () => {
	const [value, setValue] = React.useState("");
	const handleInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	};

	const [fnCount, setFnCount] = React.useState(0);

	/* This function will only be executed if there is no new input for 1s */
	const _doCallback = () => {
		console.log(value);
		setFnCount((curr) => curr + 1);
	};
	const doCallback = useDebounceFn(_doCallback, 1000);

	React.useEffect(() => {
		doCallback();
	}, [value]);

	return (
		<div>
			<input type="text" onChange={handleInput} />
			<div>Input value: {value}</div>
			<div># CB calls: {fnCount}</div>
		</div>
	);
};
