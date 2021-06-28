/**
 * @public
 *
 * Finds an object in a array of objects with children.
 *
 * @param arr - The source array to search in.
 * @param predicate - The predicate to match the object to.
 */
export function findInTree<T extends { children?: T[] }>(arr: T[], predicate: (value: T) => boolean): T | undefined {
	for (let index = 0; index < arr.length; index++) {
		const term = arr[index];

		if (predicate(term)) {
			return term;
		} else if (!!term.children && term.children.length > 0) {
			const match = findInTree(term.children, predicate);

			if (match) {
				return match;
			}
		}
	}
}
