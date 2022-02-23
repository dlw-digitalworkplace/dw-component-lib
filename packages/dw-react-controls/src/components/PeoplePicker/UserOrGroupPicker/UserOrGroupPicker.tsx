import { BaseAutoFill, IInputProps } from "office-ui-fabric-react";
import * as React from "react";
import { useTheme } from "../../../utilities";
import { UserOrGroupPickerBase } from "./UserOrGroupPicker.base";
import { getStyles } from "./UserOrGroupPicker.styles";
import { IUserOrGroupPickerProps } from "./UserOrGroupPicker.types";

export const UserOrGroupPicker: React.FC<IUserOrGroupPickerProps> = ({
	inputProps: inputPropsProp,
	isInvalid: isInvalidProp,
	onBlur: onBlurProp,
	onFocus: onFocusProp,
	styles: customStyles,
	...props
}: IUserOrGroupPickerProps): JSX.Element => {
	const { itemLimit = 0, selectedItems = [] } = props;

	const [isInvalid, setIsInvalid] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);

	const theme = useTheme("UserOrGroupPicker");

	React.useEffect(() => {
		setIsInvalid(itemLimit > 0 && itemLimit < selectedItems.length);
	}, [itemLimit, selectedItems]);

	const onFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
		if (inputPropsProp?.onFocus) {
			inputPropsProp.onFocus(ev);
		}

		setIsFocused(true);
	};

	const onBlur = (ev: React.FocusEvent<HTMLInputElement | BaseAutoFill>): void => {
		if (onBlurProp) {
			onBlurProp(ev);
		}
		setIsFocused(false);
	};

	const inputProps: IInputProps = {
		...inputPropsProp,
		onFocus: onFocus
	};

	const styles = getStyles({
		...props,
		isFocused,
		isInvalid: isInvalidProp === undefined ? isInvalid : isInvalidProp,
		theme,
		styles: customStyles
	});

	return <UserOrGroupPickerBase {...props} inputProps={{ ...inputProps }} onBlur={onBlur} styles={styles} />;
};
