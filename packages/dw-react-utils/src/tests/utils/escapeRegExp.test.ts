import { escapeRegExp } from "../../utils";

describe("escapeRegExp", () => {
	it("should escape invalid RegExp characters", () => {
		// arrange
		const input = "a b c d e f 0 1 2 3 4 5 6 7 8 9 - \\ ^ $ * + ? . ( ) | { } [ ]";

		// act
		const output = escapeRegExp(input);

		// assert
		expect(output).toBe("a b c d e f 0 1 2 3 4 5 6 7 8 9 - \\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]");
	});

	it("should match itself after being escaped", () => {
		// arrange
		const text = "My value contains (some) invalid characters. With ^ $ * + ? ( ) | { } [ ] and .";

		// act
		const escapedText = escapeRegExp(text);

		const regexp = new RegExp(escapedText, "gi");
		const match = text.match(regexp);

		// assert
		expect(match).toBeTruthy();
	});
});
