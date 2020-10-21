import { styled } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { TreeItemContentBase } from "./TreeItemContent.base";
import { getStyles } from "./TreeItemContent.styles";
import { ITreeItemContentProps, ITreeItemContentStyleProps, ITreeItemContentStyles } from "./TreeItemContent.types";

export const TreeItemContent: React.FC<ITreeItemContentProps> = styled<
	ITreeItemContentProps,
	ITreeItemContentStyleProps,
	ITreeItemContentStyles
>(TreeItemContentBase, getStyles);
