import { styled } from "@fluentui/react";
import * as React from "react";
import { SplitPaneBase } from "./SplitPane.base";
import { getStyles } from "./SplitPane.styles";
import { ISplitPaneProps, ISplitPaneStyleProps, ISplitPaneStyles } from "./SplitPane.types";

export const SplitPane: React.FC<ISplitPaneProps> = styled<ISplitPaneProps, ISplitPaneStyleProps, ISplitPaneStyles>(
	SplitPaneBase,
	getStyles
);
