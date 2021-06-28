/**
 * @public
 *
 * Flattens an array to a single-level array, moving all children to the root.
 *
 * @param arr - The source array to flatten.
 */
export function flatten<T extends { children?: T[] }>(arr: T[]) {
	const result: T[] = [];

	arr.forEach((item) => {
		result.push({ ...item, children: [] });

		if (item.children) {
			result.push(...flatten(item.children));
		}
	});

	return result;
}
