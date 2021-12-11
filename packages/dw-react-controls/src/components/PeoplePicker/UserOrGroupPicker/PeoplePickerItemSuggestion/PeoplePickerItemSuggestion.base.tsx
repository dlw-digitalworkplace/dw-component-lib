import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { IGroup, IUser } from "../../models";
import {
	IPeoplePickerItemSuggestionProps,
	IPeoplePickerItemSuggestionStyleProps,
	IPeoplePickerItemSuggestionStyles
} from "./PickerItemSuggestion.types";
import { Persona, PersonaSize } from "office-ui-fabric-react/lib/Persona";

const getClassNames = classNamesFunction<IPeoplePickerItemSuggestionStyleProps, IPeoplePickerItemSuggestionStyles>();

export const PeoplePickerItemSuggestionBase: React.FC<IPeoplePickerItemSuggestionProps> = ({ item, styles, theme }) => {
	const classNames = getClassNames(styles, {
		theme: theme!
	});

	// Check if user or group
	if ("userPrincipalName" in item) {
		const user = item as IUser;
		return (
			<div className={classNames.root}>
				<Persona
					size={PersonaSize.size40}
					imageUrl={user.imageUrl}
					text={user.displayName}
					secondaryText={user.jobTitle}
				/>
			</div>
		);
	} else {
		const group = item as IGroup
		return (
			<div className={classNames.root}>
				<Persona
					size={PersonaSize.size40}
					text={group.displayName}
				/>
			</div>
		);
	}
};
