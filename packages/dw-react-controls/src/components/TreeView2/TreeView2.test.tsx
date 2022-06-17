import { render } from "@testing-library/react";
import * as React from "react";
import { TreeView2 } from "./TreeView2";

describe("<TreeView2 />", () => {
	describe("Rendering", () => {
		it("should render empty control without crashing", () => {
			const { getByRole } = render(<TreeView2 />);

			expect(getByRole(/tree/i)).toBeTruthy();
		});
	});
});
