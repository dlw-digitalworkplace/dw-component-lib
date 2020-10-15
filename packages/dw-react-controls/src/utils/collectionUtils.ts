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
}
