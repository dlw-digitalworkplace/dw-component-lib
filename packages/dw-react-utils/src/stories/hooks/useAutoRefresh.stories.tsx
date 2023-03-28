import { Story } from "@storybook/react";
import * as React from "react";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";

export const Basic: Story = () => {
	const [date, setDate] = React.useState<Date | null>(null);

	const getDate = () => {
		const newDate = new Date();
		setDate(newDate);
	};

	useAutoRefresh(getDate, 1);

	return (
		<div>
			The current datetime is: {date?.toLocaleDateString()}, {date?.toLocaleTimeString()}
		</div>
	);
};
