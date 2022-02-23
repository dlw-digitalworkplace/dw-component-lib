import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Persona, PersonaSize } from "office-ui-fabric-react/lib/Persona";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { IPeoplePickerItemProps, IPeoplePickerItemStyleProps, IPeoplePickerItemStyles } from "./PeoplePickerItem.types";

const getClassNames = classNamesFunction<IPeoplePickerItemStyleProps, IPeoplePickerItemStyles>();

export const PeoplePickerItemBase: React.FC<IPeoplePickerItemProps> = ({
	onRemoveItem,
	className,
	index,
	removeButtonAriaLabel,
	styles,
	theme,
	item
}) => {
	const classNames = getClassNames(styles, { className, theme: theme! });

	return (
		<div className={classNames.root} role={"listitem"} key={index} data-selection-index={index}>
			<Persona text={item.displayName} size={PersonaSize.size24} />

			<IconButton
				onClick={onRemoveItem}
				iconProps={{ iconName: "Cancel", styles: { root: { fontSize: "12px" } } }}
				className={classNames.close}
				ariaLabel={removeButtonAriaLabel}
			/>
		</div>
	);
};
