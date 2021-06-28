import { findInTree } from "../../../utils";

describe("findInTree", () => {
	it("should find an object in an array", () => {
		// arrange
		const source = [
			{ id: 1, name: "Item 1", children: [{ id: 11, name: "Item 11" }] },
			{ id: 2, name: "Item 2" },
			{
				id: 3,
				name: "Item 3",
				children: [
					{ id: 31, name: "Item 31", children: [{ id: 311, name: "Item 311" }] },
					{ id: 32, name: "Item 32" }
				]
			}
		];

		// act
		const result1 = findInTree(source, (it) => it.name === "Item 11");
		const result2 = findInTree(source, (it) => it.name === "Item 311");

		// assert
		expect(result1!.id).toBe(11);
		expect(result2!.id).toBe(311);
	});
});
