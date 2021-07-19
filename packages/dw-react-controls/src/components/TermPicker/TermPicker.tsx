import { BaseAutoFill } from "office-ui-fabric-react";
import * as React from "react";
import { useTheme } from "../../utilities";
import { ITermValue } from "./models";
import { TermPickerBase } from "./TermPicker.base";
import { getStyles } from "./TermPicker.styles";
import { ITermPickerProps } from "./TermPicker.types";

export const TermPicker = ({
	isInvalid: isInvalidProp,
	onBlur: onBlurProp,
	onEmptyInputFocus: onInputFocusProp,
	onFocus: onFocusProp,
	styles: customStyles,
	...props
}: ITermPickerProps) => {
	const { itemLimit = 0, selectedItems = [] } = props;

	const [isInvalid, setIsInvalid] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);

	const theme = useTheme("TermPicker");

	React.useEffect(() => {
		setIsInvalid(itemLimit > 0 && itemLimit < selectedItems.length);
	}, [itemLimit, selectedItems]);

	const onInputFocus = (items: ITermValue[]): ITermValue[] => {
		if (onInputFocusProp) {
			onInputFocusProp(items);
		}
		setIsFocused(true);
		return items;
	};

	const onBlur = (ev: React.FocusEvent<HTMLInputElement | BaseAutoFill>): void => {
		if (onBlurProp) {
			onBlurProp(ev);
		}
		setIsFocused(false);
	};

	const styles = getStyles({
		...props,
		isFocused,
		isInvalid: isInvalidProp === undefined ? isInvalid : isInvalidProp,
		theme,
		styles: customStyles
	});

	return <TermPickerBase {...props} onEmptyInputFocus={onInputFocus} onBlur={onBlur} styles={styles} />;
};
