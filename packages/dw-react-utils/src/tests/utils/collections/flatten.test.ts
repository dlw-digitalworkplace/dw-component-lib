import { flatten } from "../../../utils";

describe("flatten", () => {
	it("should flatten an array", () => {
		// arrange
		const source = [
			{ id: 1, children: [{ id: 11 }, { id: 12 }] },
			{ id: 2 },
			{ id: 3, children: [{ id: 31, children: [{ id: 311 }] }, { id: 32 }] }
		];

		// act
		const result = flatten(source);

		// assert
		expect(result.length).toBe(8);
	});

	it("should clear the source's children", () => {
		// arrange
		const source = [
			{
				id: 1,
				children: [{ id: 11, children: [] }]
			}
		];

		// act
		const result = flatten(source);

		// assert
		expect(result).toMatchObject([
			{ id: 1, children: [] },
			{ id: 11, children: [] }
		]);
	});
});
