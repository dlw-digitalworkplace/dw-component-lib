import { styled } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { TreeViewBase } from "./TreeView.base";
import { getStyles } from "./TreeView.styles";
import { ITreeViewStyleProps, ITreeViewStyles, TreeViewProps } from "./TreeView.types";

export const TreeView: React.FC<TreeViewProps> = styled<TreeViewProps, ITreeViewStyleProps, ITreeViewStyles>(
	TreeViewBase,
	getStyles
);
