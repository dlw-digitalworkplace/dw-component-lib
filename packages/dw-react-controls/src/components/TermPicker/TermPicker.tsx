import { Autofill, IInputProps, useTheme } from "@fluentui/react";
import * as React from "react";
import { TermPickerBase } from "./TermPicker.base";
import { getStyles } from "./TermPicker.styles";
import { ITermPickerProps } from "./TermPicker.types";

export const TermPicker = ({
	inputProps: inputPropsProp,
	isInvalid: isInvalidProp,
	onBlur: onBlurProp,
	onFocus: _,
	styles: customStyles,
	...props
}: ITermPickerProps) => {
	const { itemLimit = 0, selectedItems = [] } = props;

	const [isInvalid, setIsInvalid] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);

	const theme = useTheme();

	React.useEffect(() => {
		setIsInvalid(itemLimit > 0 && itemLimit < selectedItems.length);
	}, [itemLimit, selectedItems]);

	const onFocus = (ev: React.FocusEvent<HTMLInputElement>): void => {
		if (inputPropsProp?.onFocus) {
			inputPropsProp.onFocus(ev);
		}

		setIsFocused(true);
	};

	const onBlur = (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
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

	return <TermPickerBase {...props} inputProps={{ ...inputProps }} onBlur={onBlur} styles={styles} />;
};
