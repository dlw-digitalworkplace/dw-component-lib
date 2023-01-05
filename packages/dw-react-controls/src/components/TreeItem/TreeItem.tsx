import { styled } from "@fluentui/react";
import * as React from "react";
import { TreeItemBase } from "./TreeItem.base";
import { getStyles } from "./TreeItem.styles";
import { ITreeItemProps, ITreeItemStyleProps, ITreeItemStyles } from "./TreeItem.types";

export const TreeItem: React.FC<ITreeItemProps> = styled<ITreeItemProps, ITreeItemStyleProps, ITreeItemStyles>(
	TreeItemBase,
	getStyles
);
