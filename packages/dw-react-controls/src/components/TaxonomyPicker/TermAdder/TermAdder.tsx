import { styled } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { TermAdderBase } from "./TermAdder.base";
import { getStyles } from "./TermAdder.styles";
import { ITermAdderProps, ITermAdderStyleProps, ITermAdderStyles } from "./TermAdder.types";

export const TermAdder: React.FC<ITermAdderProps> = styled<ITermAdderProps, ITermAdderStyleProps, ITermAdderStyles>(
	TermAdderBase,
	getStyles
);
