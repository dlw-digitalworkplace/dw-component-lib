import * as React from "react";

export interface ITreeViewContext {
	isExpanded(id: string): boolean;
	isSelected(id: string): boolean;
	selectNode(event: React.SyntheticEvent<HTMLElement>, id: string): void;
	toggleExpansion(event: React.SyntheticEvent<HTMLElement>, id: string): void;
}

const TreeViewContext = React.createContext<ITreeViewContext>({} as ITreeViewContext);

if (process.env.NODE_ENV !== "production") {
	TreeViewContext.displayName = "TreeViewContext";
}

export default TreeViewContext;
