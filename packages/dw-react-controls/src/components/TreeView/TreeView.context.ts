import * as React from "react";
import { ITreeViewNode } from "./TreeView.types";

export interface ITreeViewContext {
	disabledItemsFocusable?: boolean;
	focus: (event: React.SyntheticEvent, nodeId: string) => void;
	isDisabled: (nodeId: string) => boolean;
	isExpandable: (nodeId: string) => boolean;
	isExpanded: (nodeId: string) => boolean;
	isFocused: (nodeId: string) => boolean;
	isSelected: (nodeId: string) => boolean;
	mapFirstChar: (nodeId: string, firstChar: string) => void;
	multiSelect?: boolean;
	registerNode: (node: ITreeViewNode) => void;
	selectNode: (event: React.SyntheticEvent, nodeId: string | null, multiple?: boolean) => void;
	toggleExpansion: (event: React.SyntheticEvent, nodeId?: string) => void;
	treeId: string;
	unmapFirstChar: (nodeId: string) => void;
	unregisterNode: (nodeId: string) => void;
}

const TreeViewContext = React.createContext<ITreeViewContext>({} as ITreeViewContext);

if (process.env.NODE_ENV !== "production") {
	TreeViewContext.displayName = "TreeViewContext";
}

export default TreeViewContext;
