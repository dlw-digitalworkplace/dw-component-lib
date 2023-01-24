import * as React from "react";

function findIndex<T>(array: T[], compare: (item: T) => boolean): number {
	for (let i = 0; i < array.length; i++) {
		if (compare(array[i])) {
			return i;
		}
	}
	return -1;
}

function binaryFindElement(array: IDescendant[], element: HTMLElement | null): number {
	let start = 0;
	let end = array.length - 1;

	while (start <= end) {
		const middle = Math.floor((start + end) / 2);

		if (array[middle].element === element) {
			return middle;
		}

		if (
			element !== null &&
			array[middle].element !== null &&
			// tslint:disable-next-line: no-bitwise
			array[middle].element!.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING
		) {
			end = middle - 1;
		} else {
			start = middle + 1;
		}
	}

	return start;
}

const noop = () => {
	/* noop */
};

export interface IDescendant {
	id: string;
	element: HTMLElement | null;
}

type Descendant = IDescendant & { index: number };

export interface IDescendantContext {
	descendants: IDescendant[];
	parentId: string | null;
	registerDescendant: (descendant: Descendant) => void;
	unregisterDescendant: (element: HTMLElement | null) => void;
}

const DescendantContext = React.createContext<IDescendantContext>({
	descendants: [],
	parentId: null,
	registerDescendant: noop,
	unregisterDescendant: noop
});

if (process.env.NODE_ENV !== "production") {
	DescendantContext.displayName = "DescendantContext";
}

function usePrevious<T>(value: T): T | null {
	const ref = React.useRef<T | null>(null);

	React.useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}

export function useDescendant(descendant: IDescendant): { index: number; parentId: string | null } {
	const [, forceUpdate] = React.useState<{}>();
	const {
		descendants = [],
		parentId = null,
		registerDescendant = noop,
		unregisterDescendant = noop
	} = React.useContext(DescendantContext);

	const index = findIndex(descendants, (item) => item.element === descendant.element);
	const previousDescendants = usePrevious(descendants);

	const someDescendantsHaveChanged = descendants.some((newDescendant, position) => {
		return (
			previousDescendants &&
			previousDescendants[position] &&
			previousDescendants[position].element !== newDescendant.element
		);
	});

	React.useLayoutEffect(() => {
		if (descendant.element) {
			registerDescendant({ ...descendant, index });

			return () => unregisterDescendant(descendant.element);
		}

		forceUpdate({});

		return undefined;
	}, [descendant, index, registerDescendant, someDescendantsHaveChanged, unregisterDescendant]);

	return { index, parentId };
}

export interface IDescendantProviderProps {
	id?: string | null;
}

export const DescendantProvider = (props: React.PropsWithChildren<IDescendantProviderProps>) => {
	const { children, id } = props;

	const [items, setItems] = React.useState<Descendant[]>([]);

	const registerDescendant = React.useCallback(({ element, ...other }: Descendant) => {
		setItems((prev) => {
			let newItems: Descendant[];
			if (prev.length === 0) {
				return [{ ...other, element, index: 0 }];
			}

			const index = binaryFindElement(prev, element);

			if (prev[index] && prev[index].element === element) {
				newItems = prev;
			} else {
				const newItem = { ...other, element, index };

				newItems = prev.slice();
				newItems.splice(index, 0, newItem);
			}

			newItems.forEach((item, position) => {
				item.index = position;
			});

			return newItems;
		});
	}, []);

	const unregisterDescendant = React.useCallback((element: HTMLElement | null) => {
		setItems((prev) => prev.filter((item) => element !== item.element));
	}, []);

	const value = React.useMemo<IDescendantContext>(
		() => ({
			descendants: items,
			parentId: id !== undefined ? id : null,
			registerDescendant,
			unregisterDescendant
		}),
		[id, items, registerDescendant, unregisterDescendant]
	);

	return <DescendantContext.Provider value={value}>{children}</DescendantContext.Provider>;
};
