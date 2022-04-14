import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import {
	IPeoplePickerItemSuggestionProps,
	IPeoplePickerItemSuggestionStyleProps,
	IPeoplePickerItemSuggestionStyles
} from "./PeoplePickerItemSuggestion.types";
import { Persona, PersonaSize } from "office-ui-fabric-react/lib/Persona";

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
