export interface IDemoTaxonomyPickerProps {
	allowAddingTerms: boolean;
	allowDeprecatedTerms: boolean;
	allowDisabledTerms: boolean;
	anchorId?: string;
	fetchMode: "Full" | "Recursive";
	showDeprecatedTerms: boolean;
	showDisabledTerms: boolean;
	preCacheTerms: boolean;
	termSetIdOrName: string;
}
