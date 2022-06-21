import * as React from "react";
import { ITreeViewNode } from "./AccessibleTreeView.types";

export interface IAccessibleTreeViewContext {
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

const AccessibleTreeViewContext = React.createContext<IAccessibleTreeViewContext>({} as IAccessibleTreeViewContext);

if (process.env.NODE_ENV !== "production") {
	AccessibleTreeViewContext.displayName = "AccessibleTreeViewContext";
}

export default AccessibleTreeViewContext;
