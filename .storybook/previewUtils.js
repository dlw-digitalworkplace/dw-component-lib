const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
const compareAlphabetical = (a, b) => a.localeCompare(b, { numeric: true });

// Example of a reference order
// Note: keys must be in all lowercase
export const storiesOrder = {
	"getting started": {
		introduction: null
	},
	components: {
		introduction: null
	},
	"spfx controls": {
		introduction: null
	},
	"refresh cache": {
		introduction: null,
		"refresh cache": null
	},
	taxonomyproviders: null,
	utils: {
		introduction: null
	},
	changelog: null
};

export const compareStoryPaths = (order, path1, path2, fallbackAlphabetically) => {
	if (path1.length === 0 && path2.length === 0) {
		return 0;
	} else if (path1.length === 0 && path2.length > 0) {
		// Path1 must be an ancestor of path2
		return -1;
	} else if (path1.length > 0 && path2.length === 0) {
		// Path2 must be an ancestor of path1
		return 1;
	}

	const [path1Head, ...path1Tail] = path1;
	const [path2Head, ...path2Tail] = path2;

	if (!order) {
		// don't change sort order
		if (!fallbackAlphabetically) return 0;
		else {
			const comp = compareAlphabetical(path1Head, path2Head);
			if (comp === 0) {
				return compareStoryPaths(null, path1Tail, path2Tail, fallbackAlphabetically);
			} else {
				return comp;
			}
		}
	}

	if (path1Head === path2Head) {
		// The two paths share the same head
		const key = path1Head;

		if (hasKey(order, key)) {
			return compareStoryPaths(order[key], path1Tail, path2Tail, fallbackAlphabetically);
		} else {
			return compareStoryPaths(null, path1Tail, path2Tail, fallbackAlphabetically);
		}
	}

	if (!hasKey(order, path1Head) && !hasKey(order, path2Head)) {
		return compareStoryPaths(null, path1, path2, fallbackAlphabetically);
	} else if (hasKey(order, path1Head) && !hasKey(order, path2Head)) {
		return -1; // Give preference to path1, since it is included in the reference order
	} else if (!hasKey(order, path1Head) && hasKey(order, path2Head)) {
		return 1; // Give preference to path2, since it is included in the reference order
	} else {
		// If both heads are in the reference order, use the ordering of the keys in the reference order
		const orderKeys = Object.keys(order);

		return orderKeys.indexOf(path1Head) < orderKeys.indexOf(path2Head) ? -1 : 1;
	}
};
