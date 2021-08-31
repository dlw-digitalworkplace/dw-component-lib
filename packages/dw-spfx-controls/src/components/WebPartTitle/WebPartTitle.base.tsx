import { DisplayMode } from "@microsoft/sp-core-library";
import * as strings from "DWControlStrings";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { IWebPartTitleProps, IWebPartTitleStyleProps, IWebPartTitleStyles } from "./WebPartTitle.types";

const getClassNames = classNamesFunction<IWebPartTitleStyleProps, IWebPartTitleStyles>();

export const WebPartTitleBase: React.FC<IWebPartTitleProps> = (props) => {
	const { className, displayMode, hidden, onUpdate, placeholder, styles, theme, title } = props;

	const classNames = getClassNames(styles, { className, theme: theme });

	/**
	 * Handle changes to the textarea
	 */
	const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
		onUpdate(ev.target.value);
	};

	if (displayMode === DisplayMode.Edit) {
		// if in edit mode
		return (
			<div className={classNames.root}>
				<TextareaAutosize
					aria-label={strings.WebPartTitleLabel}
					className={classNames.textarea}
					data-testid="input"
					defaultValue={title}
					placeholder={placeholder || strings.WebPartTitlePlaceholder}
					onChange={handleChange}
				/>
			</div>
		);
	}

	if (displayMode === DisplayMode.Read) {
		// if in display mode
		if (!title || hidden) {
			return null;
		}

		return (
			<div className={classNames.root}>
				<span role="heading" aria-level={2} data-testid="title">
					{title}
				</span>
			</div>
		);
	}

	return null;
};
