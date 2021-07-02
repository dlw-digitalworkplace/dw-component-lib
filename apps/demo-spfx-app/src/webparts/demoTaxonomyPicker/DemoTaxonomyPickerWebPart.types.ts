import * as React from "react";

export interface IDemoTaxonomyPickerWebPartProps {
	preCacheTerms: boolean;
	termSetIdOrName: string;
}

export interface IWebPartContext {
	siteUrl: string;
}

export const RenderWidthContext = React.createContext(0);
if (process.env.NODE_ENV !== "production") {
	RenderWidthContext.displayName = "RenderWidthContext";
}

export const WebPartContext = React.createContext<IWebPartContext>(undefined);
if (process.env.NODE_ENV !== "production") {
	WebPartContext.displayName = "WebPartContext";
}
