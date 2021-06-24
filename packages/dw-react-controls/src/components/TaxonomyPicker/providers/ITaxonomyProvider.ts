import { ITerm } from "../../../models";

export interface ITaxonomyProvider {
	termValidationRegex?: RegExp;

	getTerms(): ITerm[] | PromiseLike<ITerm[]>;

	getTermTree(): ITerm[] | PromiseLike<ITerm[]>;

	createTerm(newValue: string, parentId?: string): ITerm | PromiseLike<ITerm>;
}
