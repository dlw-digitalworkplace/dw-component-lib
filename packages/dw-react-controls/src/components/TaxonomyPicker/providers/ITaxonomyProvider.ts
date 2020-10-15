import { ITerm } from "../../../models";

export interface ITaxonomyProvider {
	getTerms(): ITerm[] | PromiseLike<ITerm[]>;

	getTermTree(): ITerm[] | PromiseLike<ITerm[]>;
}
