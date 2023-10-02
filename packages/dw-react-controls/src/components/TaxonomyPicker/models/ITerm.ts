import { ITermInfo } from "../../TermPicker";

export interface ITerm extends ITermInfo {
	children?: ITerm[];
	disabled?: boolean;
}
