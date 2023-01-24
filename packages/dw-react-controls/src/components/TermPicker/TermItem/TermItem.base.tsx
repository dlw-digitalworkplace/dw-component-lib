import { classNamesFunction, IconButton } from "@fluentui/react";
import * as React from "react";
import { ITermItemProps, ITermItemStyleProps, ITermItemStyles } from "./TermItem.types";

const getClassNames = classNamesFunction<ITermItemStyleProps, ITermItemStyles>();

export const TermItemBase: React.FC<ITermItemProps> = ({
	children,
	className,
	disabled,
	enableTagFocusInDisabledPicker,
	index,
	onRemoveItem,
	removeButtonAriaLabel,
	styles,
	theme,
	title
}) => {
	const classNames = getClassNames(styles, { className, theme: theme! });

	return (
		<div
			className={classNames.termItem}
			role={"listitem"}
			key={index}
			data-selection-index={index}
			data-is-focusable={(enableTagFocusInDisabledPicker || !disabled) && true}
		>
			<span className={classNames.text} aria-label={title} title={title}>
				{children}
			</span>

			<IconButton
				onClick={onRemoveItem}
				disabled={disabled}
				iconProps={{ iconName: "Cancel", styles: { root: { fontSize: "12px" } } }}
				className={classNames.close}
				ariaLabel={removeButtonAriaLabel}
			/>
		</div>
	);
};
