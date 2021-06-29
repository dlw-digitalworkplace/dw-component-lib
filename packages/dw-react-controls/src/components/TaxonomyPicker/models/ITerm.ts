import { ITermValue } from "../../TermPicker";

export interface ITerm extends ITermValue {
	children?: ITerm[];
	disabled?: boolean;
	additionalProperties?: {
		[key: string]: any;
	};
}
