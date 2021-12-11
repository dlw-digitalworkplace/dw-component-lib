import * as React from "react";
import { IPeoplePickerProps } from "./PeoplePicker.types";
import { NormalPeoplePicker } from "office-ui-fabric-react/lib/Pickers";
import { IUser } from "./models/IUser";
import { IGroup } from "./models/IGroup";
import { IPersonaProps } from "office-ui-fabric-react";

export const PeoplePickerBase: React.FC<IPeoplePickerProps> = (props: IPeoplePickerProps) => {
	const { provider, selectedItems, onChange } = props;

	const mapToPersona = (items: (IUser | IGroup)[]): IPersonaProps[] => {
		return items.map(i => ({ id: i.id, text: i.displayName }));
	};

	const onResolveSuggestions = async (filter: string): Promise<IPersonaProps[]> => {
		return mapToPersona(await provider.findUserOrGroup(filter));
	};

	return (
		<NormalPeoplePicker
			{...props}
			selectedItems={mapToPersona(selectedItems)}
			onResolveSuggestions={onResolveSuggestions}
			onChange={onChange}
		/>
	);
};
