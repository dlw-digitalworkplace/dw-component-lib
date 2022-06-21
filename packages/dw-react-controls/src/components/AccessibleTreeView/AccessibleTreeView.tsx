import { styled } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { AccessibleTreeViewBase } from "./AccessibleTreeView.base";
import { getStyles } from "./AccessibleTreeView.styles";
import {
	AccessibleTreeViewProps,
	IAccessibleTreeViewStyleProps,
	IAccessibleTreeViewStyles
} from "./AccessibleTreeView.types";

export const AccessibleTreeView: React.FC<AccessibleTreeViewProps> = styled<
	AccessibleTreeViewProps,
	IAccessibleTreeViewStyleProps,
	IAccessibleTreeViewStyles
>(AccessibleTreeViewBase, getStyles);
