export interface IDemoTaxonomyPickerProps {
	allowAddingTerms: boolean;
	allowDeprecatedTerms: boolean;
	allowDisabledTerms: boolean;
	anchorId?: string;
	showDeprecatedTerms: boolean;
	showDisabledTerms: boolean;
	preCacheTerms: boolean;
	termSetIdOrName: string;
}
