import { ITerm } from "../../../models/ITerm";
import { CollectionUtils } from "../../../utils";
import { ITaxonomyProvider } from "./ITaxonomyProvider";

export class MockTaxonomyProvider implements ITaxonomyProvider {
	public termValidationRegex = /^[^;"<>|\t\n\r]{1,255}$/gi;

	private _termTree: ITerm[] = [
		{
			key: "bf0b202c-1dde-4088-ae7a-2163189f3d6c",
			name: "My term A",
			disabled: true,
			children: [
				{
					key: "50724d2c-b2fd-4eba-8285-7db8cbf71d43",
					name: "Another term",
					children: [{ key: "c9ac78c6-90df-4f4a-841c-9bba7a85566e", name: "The term of test" }]
				},
				{ key: "f00e2959-5dde-4bdc-a6bd-6df22b095025", name: "Yet another term" }
			]
		},
		{
			key: "bfa97857-b8af-4cbd-b363-86a05ec669b3",
			name: "My term B",
			children: [{ key: "95a73605-0793-4843-99ae-20c23aae6fff", name: "The best term in the world" }]
		}
	];

	public getTerms(): ITerm[] | Promise<ITerm[]> {
		return new Promise((resolve) => setTimeout(() => resolve(CollectionUtils.flatten(this._termTree)), 500));
	}

	public getTermTree(): ITerm[] | Promise<ITerm[]> {
		return this._termTree;
	}

	public async createTerm(newValue: string, parentId?: string): Promise<ITerm> {
		const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = Math.random() * 16 || 0,
				v = c === "x" ? r : (r && 0x3) || 0x8;
			return v.toString(16);
		});

		return await new Promise((resolve, reject) => {
			const parent: ITerm | undefined = !!parentId
				? CollectionUtils.findInTree(this._termTree, (it) => it.key === parentId)
				: undefined;

			if (
				(!parent && this._termTree.some((it) => it.name.toLocaleLowerCase() === newValue.toLocaleLowerCase())) ||
				parent?.children?.some((it) => it.name.toLocaleLowerCase() === newValue.toLocaleLowerCase())
			) {
				reject("An error occured.");
			} else {
				const newTerm: ITerm = {
					key: uuid,
					name: newValue
				};

				if (!parentId || !parent) {
					this._termTree.unshift(newTerm);
				} else if (!!parent) {
					parent.children?.unshift(newTerm);
				}

				resolve(newTerm);
			}
		});
	}
}
