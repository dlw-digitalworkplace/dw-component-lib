import { render } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const TestComponent = ({ initialValue = 0 }: { initialValue?: number }) => {
	const [value, setValue] = useState(initialValue);
	const debouncedValue = useDebounce(value, 1000);

	const increment = () => setValue(value + 1);

	return (
		<div>
			<button onClick={increment}>Increment</button>
			<span data-testid={"debouncedValue"}>{debouncedValue}</span>
			<span data-testid={"value"}>{value}</span>
		</div>
	);
};

describe("useDebounce", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("should only update value after delay", () => {
		const { getByTestId, getByText } = render(<TestComponent />);
		const incrementButton = getByText("Increment");
		const debouncedValue = getByTestId("debouncedValue");
		const value = getByTestId("value");

		const incrementAndContinue = (passedTime: number) => {
			act(() => {
				userEvent.click(incrementButton);
				jest.advanceTimersByTime(passedTime);
			});
		};

		incrementAndContinue(100);

		expect(debouncedValue.textContent).toBe("0");
		expect(value.textContent).toBe("1");

		incrementAndContinue(500);

		expect(debouncedValue.textContent).toBe("0");
		expect(value.textContent).toBe("2");

		incrementAndContinue(999);

		expect(debouncedValue.textContent).toBe("0");
		expect(value.textContent).toBe("3");

		act(() => {
			jest.advanceTimersByTime(1);
		});

		expect(debouncedValue.textContent).toBe("3");
		expect(value.textContent).toBe("3");
	});
});
