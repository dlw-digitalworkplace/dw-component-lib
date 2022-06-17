import { styled } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { TreeView2Base } from "./TreeView2.base";
import { getStyles } from "./TreeView2.styles";
import { ITreeView2StyleProps, ITreeView2Styles, TreeView2Props } from "./TreeView2.types";

export const TreeView2: React.FC<TreeView2Props> = styled<TreeView2Props, ITreeView2StyleProps, ITreeView2Styles>(
	TreeView2Base,
	getStyles
);
