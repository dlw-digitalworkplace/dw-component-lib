import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import {
	ITermItemSuggestionProps,
	ITermItemSuggestionStyleProps,
	ITermItemSuggestionStyles
} from "./TermItemSuggestion.types";

const getClassNames = classNamesFunction<ITermItemSuggestionStyleProps, ITermItemSuggestionStyles>();

export const TermItemSuggestionBase: React.FC<ITermItemSuggestionProps> = ({ children, styles, theme }) => {
	const classNames = getClassNames(styles, {
		theme: theme!
	});

	return <div className={classNames.suggestionTextOverflow}> {children} </div>;
};
