import { ITermValue } from "./ITermValue";

export interface ITermInfo extends ITermValue {
	additionalProperties?: { [key: string]: any };
}
