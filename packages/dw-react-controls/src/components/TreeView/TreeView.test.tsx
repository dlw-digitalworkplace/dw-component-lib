import { render } from "@testing-library/react";
import * as React from "react";
import { TreeView } from "./TreeView";

describe("<TreeView />", () => {
	describe("Rendering", () => {
		it("should render empty control without crashing", () => {
			const { getByRole } = render(<TreeView />);

			expect(getByRole(/tree/i)).toBeTruthy();
		});
	});
});
