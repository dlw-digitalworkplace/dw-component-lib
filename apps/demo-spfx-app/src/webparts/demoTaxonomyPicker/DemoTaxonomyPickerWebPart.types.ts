import * as React from "react";

export interface IDemoTaxonomyPickerWebPartProps {
	allowAddingTerms: boolean;
	allowDeprecatedTerms: boolean;
	preCacheTerms: boolean;
	termSetIdOrName: string;
}

export interface IWebPartContext {
	siteUrl: string;
}

export const RenderWidthContext = React.createContext(0);
// tslint:disable-next-line:no-unused-expression
if (process.env.NODE_ENV !== "production") {
	RenderWidthContext.displayName = "RenderWidthContext";
}

export const WebPartContext = React.createContext<IWebPartContext>(undefined);
// tslint:disable-next-line:no-unused-expression
if (process.env.NODE_ENV !== "production") {
	WebPartContext.displayName = "WebPartContext";
}
