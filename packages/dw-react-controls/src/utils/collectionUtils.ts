export namespace CollectionUtils {
	export const flatten = <T extends { children?: T[] }>(arr: T[]) => {
		const result: T[] = [];

		arr.forEach((item) => {
			result.push({ ...item, children: [] });

			if (item.children) {
				result.push(...flatten(item.children));
			}
		});

		return result;
	};

	export const findInTree = <T extends { children?: T[] }>(
		arr: T[],
		predicate: (value: T) => boolean
	): T | undefined => {
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
	};
}
