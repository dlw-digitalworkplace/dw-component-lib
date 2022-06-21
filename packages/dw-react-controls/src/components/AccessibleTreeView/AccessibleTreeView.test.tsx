import { render } from "@testing-library/react";
import * as React from "react";
import { AccessibleTreeView } from "./AccessibleTreeView";

describe("<AccessibleTreeView />", () => {
	describe("Rendering", () => {
		it("should render empty control without crashing", () => {
			const { getByRole } = render(<AccessibleTreeView />);

			expect(getByRole(/tree/i)).toBeTruthy();
		});
	});
});
