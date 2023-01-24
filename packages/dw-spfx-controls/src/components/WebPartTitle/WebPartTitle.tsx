import { styled } from "@fluentui/react";
import * as React from "react";
import { WebPartTitleBase } from "./WebPartTitle.base";
import { getStyles } from "./WebPartTitle.styles";
import { IWebPartTitleProps, IWebPartTitleStyleProps, IWebPartTitleStyles } from "./WebPartTitle.types";

export const WebPartTitle: React.FC<IWebPartTitleProps> = styled<
	IWebPartTitleProps,
	IWebPartTitleStyleProps,
	IWebPartTitleStyles
>(WebPartTitleBase, getStyles);
