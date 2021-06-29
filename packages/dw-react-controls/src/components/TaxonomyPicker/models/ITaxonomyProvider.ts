import { ITerm } from "./ITerm";
import { ITermFilterOptions } from "./ITermFilterOptions";

export interface ITaxonomyProvider {
	termValidationRegex?: RegExp;

	findTerms(search?: string | RegExp, options?: Partial<ITermFilterOptions>): ITerm[] | PromiseLike<ITerm[]>;

	getTermTree(): ITerm[] | PromiseLike<ITerm[]>;

	createTerm(newValue: string, parentId?: string): ITerm | PromiseLike<ITerm>;
}
