import { styled } from "@fluentui/react";
import { TermItemBase } from "./TermItem.base";
import { getStyles } from "./TermItem.styles";
import { ITermItemProps, ITermItemStyleProps, ITermItemStyles } from "./TermItem.types";

export const TermItem = styled<ITermItemProps, ITermItemStyleProps, ITermItemStyles>(
	TermItemBase,
	getStyles,
	undefined,
	{
		scope: "TermItem"
	}
);
