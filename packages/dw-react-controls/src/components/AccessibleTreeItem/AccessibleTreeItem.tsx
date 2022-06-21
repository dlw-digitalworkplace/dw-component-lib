import { styled } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { AccessibleTreeItemBase } from "./AccessibleTreeItem.base";
import { getStyles } from "./AccessibleTreeItem.styles";
import {
	IAccessibleTreeItemProps,
	IAccessibleTreeItemStyleProps,
	IAccessibleTreeItemStyles
} from "./AccessibleTreeItem.types";

export const AccessibleTreeItem: React.FC<IAccessibleTreeItemProps> = styled<
	IAccessibleTreeItemProps,
	IAccessibleTreeItemStyleProps,
	IAccessibleTreeItemStyles
>(AccessibleTreeItemBase, getStyles);
