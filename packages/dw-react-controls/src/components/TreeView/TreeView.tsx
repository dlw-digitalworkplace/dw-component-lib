import { styled } from "@fluentui/react";
import * as React from "react";
import { TreeViewBase } from "./TreeView.base";
import { getStyles } from "./TreeView.styles";
import { ITreeViewProps, ITreeViewStyleProps, ITreeViewStyles } from "./TreeView.types";

export const TreeView: React.FC<ITreeViewProps> = styled<ITreeViewProps, ITreeViewStyleProps, ITreeViewStyles>(
	TreeViewBase,
	getStyles
);
