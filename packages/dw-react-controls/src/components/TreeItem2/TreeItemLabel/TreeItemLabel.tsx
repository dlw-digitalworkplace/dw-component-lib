import { styled } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { TreeItemLabelBase } from "./TreeItemLabel.base";
import { getStyles } from "./TreeItemLabel.styles";
import { ITreeItemLabelProps, ITreeItemLabelStyleProps, ITreeItemLabelStyles } from "./TreeItemLabel.types";

export const TreeItemLabel: React.FC<ITreeItemLabelProps> = styled<
	ITreeItemLabelProps,
	ITreeItemLabelStyleProps,
	ITreeItemLabelStyles
>(TreeItemLabelBase, getStyles);
