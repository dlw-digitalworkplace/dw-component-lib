import { classNamesFunction, Persona, PersonaSize } from "@fluentui/react";
import * as React from "react";
import {
	IPeoplePickerItemSuggestionProps,
	IPeoplePickerItemSuggestionStyleProps,
	IPeoplePickerItemSuggestionStyles
} from "./PeoplePickerItemSuggestion.types";

const getClassNames = classNamesFunction<IPeoplePickerItemSuggestionStyleProps, IPeoplePickerItemSuggestionStyles>();

export const PeoplePickerItemSuggestionBase: React.FC<IPeoplePickerItemSuggestionProps> = ({
	title,
	label,
	imageUrl,
	styles,
	theme
}) => {
	const classNames = getClassNames(styles, {
		theme: theme!
	});

	return (
		<div className={classNames.root}>
			<Persona size={PersonaSize.size40} text={title} secondaryText={label} imageUrl={imageUrl} />
		</div>
	);
};
