import * as React from "react";
import { IUserOrGroupPickerProps } from "./UserOrGroupPicker.types";
import { getStyles } from "./UserOrGroupPicker.styles";
import { UserOrGroupPickerBase } from "./UserOrGroupPicker.base";
import { useTheme } from "../../../utilities";

export const UserOrGroupPicker: React.FC<IUserOrGroupPickerProps> = ({
	styles: customStyles,
	...props
}: IUserOrGroupPickerProps): JSX.Element => {

	const theme = useTheme("UserOrGroupPicker");

	const styles = getStyles({
		...props,
		theme,
		styles: customStyles
	});

	return <UserOrGroupPickerBase {...props} styles={styles}/>;
};
