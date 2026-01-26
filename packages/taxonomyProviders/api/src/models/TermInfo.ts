export type TermInfo = {
	termId: string;
	isDeprecated: boolean;
	isAvailableForTagging: boolean;
	labels: TermLabel[];
	name: string;
	parentId?: string;
	pathOfTerm: string;
	customSortOrder: number;
};

export type TermLabel = {
	value: string;
	language: number;
	isDefaultForLanguage: boolean;
};
