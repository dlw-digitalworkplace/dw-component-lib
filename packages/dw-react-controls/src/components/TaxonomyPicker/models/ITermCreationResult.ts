import { ITerm } from "./ITerm";

export interface ITermCreationResult {
	success: boolean;
	newTerm?: ITerm;
	error?: string;
}
