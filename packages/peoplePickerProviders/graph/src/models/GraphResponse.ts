export interface GraphResponse<T> {
	"@odata.context": string;
	"@odata.count"?: string;
	value: T;
}
