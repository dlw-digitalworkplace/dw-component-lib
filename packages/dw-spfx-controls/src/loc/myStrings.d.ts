declare interface IDWControlStrings {
	WebPartTitlePlaceholder: string;
	WebPartTitleLabel: string;
}

declare module "DWControlStrings" {
	const strings: IDWControlStrings;
	export = strings;
}
