import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import {
	ITermItemSuggestionProps,
	ITermItemSuggestionStyleProps,
	ITermItemSuggestionStyles
} from "./TermItemSuggestion.types";

const getClassNames = classNamesFunction<ITermItemSuggestionStyleProps, ITermItemSuggestionStyles>();

export const TermItemSuggestionBase: React.FC<ITermItemSuggestionProps> = ({ term, styles, theme }) => {
	const classNames = getClassNames(styles, {
		theme: theme!
	});

	return (
		<div className={classNames.root}>
			<div>{term?.name}</div>
			{term?.path && (
				<div>
					<small>{term?.path}</small>
				</div>
			)}
		</div>
	);
};
