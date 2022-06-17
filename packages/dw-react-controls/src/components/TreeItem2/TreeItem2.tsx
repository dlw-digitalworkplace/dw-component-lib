import { styled } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { TreeItem2Base } from "./TreeItem2.base";
import { getStyles } from "./TreeItem2.styles";
import { ITreeItem2Props, ITreeItem2StyleProps, ITreeItem2Styles } from "./TreeItem2.types";

export const TreeItem2: React.FC<ITreeItem2Props> = styled<ITreeItem2Props, ITreeItem2StyleProps, ITreeItem2Styles>(
	TreeItem2Base,
	getStyles
);
