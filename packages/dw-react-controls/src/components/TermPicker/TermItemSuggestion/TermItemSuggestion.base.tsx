import { IRenderFunction, classNamesFunction, composeRenderFunction } from "@fluentui/react";
import * as React from "react";
import {
	ITermItemSuggestionProps,
	ITermItemSuggestionStyleProps,
	ITermItemSuggestionStyles
} from "./TermItemSuggestion.types";

const getClassNames = classNamesFunction<ITermItemSuggestionStyleProps, ITermItemSuggestionStyles>();

export const TermItemSuggestionBase: React.FC<ITermItemSuggestionProps> = (props) => {
	const { onRenderLabel, onRenderSubText } = props;
	const { className, styles, theme } = props;

	const classNames = getClassNames(styles, {
		className,
		theme: theme!
	});

	const renderLabel: IRenderFunction<ITermItemSuggestionProps> = (props?: ITermItemSuggestionProps) => {
		return <div>{props?.term?.name}</div>;
	};

	const finalOnRenderLabel = onRenderLabel ? composeRenderFunction(onRenderLabel, renderLabel) : renderLabel;

	const renderSubText: IRenderFunction<ITermItemSuggestionProps> = (props?: ITermItemSuggestionProps) => {
		return props?.term?.path ? (
			<div>
				<small>{props.term.path}</small>
			</div>
		) : null;
	};

	const finalOnRenderSubText = onRenderSubText ? composeRenderFunction(onRenderSubText, renderSubText) : renderSubText;

	return (
		<div className={classNames.root}>
			{finalOnRenderLabel(props)}
			{finalOnRenderSubText(props)}
		</div>
	);
};
