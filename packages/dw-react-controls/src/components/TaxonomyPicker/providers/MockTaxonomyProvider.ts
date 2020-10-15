import { ITerm } from "../../../models/ITerm";
import { ITaxonomyProvider } from "./ITaxonomyProvider";

export class MockTaxonomyProvider implements ITaxonomyProvider {
	public getTerms(): ITerm[] | PromiseLike<ITerm[]> {
		return [
			{ key: "bf0b202c-1dde-4088-ae7a-2163189f3d6c", name: "My term A" },
			{ key: "bfa97857-b8af-4cbd-b363-86a05ec669b3", name: "My term B" },
			{ key: "50724d2c-b2fd-4eba-8285-7db8cbf71d43", name: "Another term" },
			{ key: "f00e2959-5dde-4bdc-a6bd-6df22b095025", name: "Yet another term" },
			{ key: "c9ac78c6-90df-4f4a-841c-9bba7a85566e", name: "The term of test" },
			{ key: "95a73605-0793-4843-99ae-20c23aae6fff", name: "The best term in the world" }
		];
	}

	public getTermTree(): ITerm[] | PromiseLike<ITerm[]> {
		return [
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
	}
}
