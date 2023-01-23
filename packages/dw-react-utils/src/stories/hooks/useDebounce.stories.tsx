import { Story } from "@storybook/react";
import * as React from "react";
import { useDebounce } from "../../hooks/useDebounce";

export const Basic: Story = () => {
	const [value, setValue] = React.useState(0);
	const debouncedValue = useDebounce(value, 1000); // will only update if no new update occurs within 1s.

	const increment = () => setValue(value + 1);

	return (
		<div>
			<button onClick={increment}>Increment</button>

			<div>Normal: {value}</div>
			<div>Debounced: {debouncedValue}</div>
		</div>
	);
};
