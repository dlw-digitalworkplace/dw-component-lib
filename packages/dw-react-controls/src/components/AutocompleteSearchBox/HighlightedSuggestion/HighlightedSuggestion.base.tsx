import * as React from "react";
import { IHighlightedSuggestionProps, IHighlightedSuggestionStyleProps, IHighlightedSuggestionStyles } from "./HighlightedSuggestion.types";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";

const getClassNames = classNamesFunction<IHighlightedSuggestionStyleProps, IHighlightedSuggestionStyles>();

export const HighlightedSuggestionBase: React.FC<IHighlightedSuggestionProps> = (props: IHighlightedSuggestionProps) => {
	const { className, styles, theme, text, filter } = props;
	const classNames = getClassNames(styles, {
		className,
		theme: theme
	});

	// Return the suggestion if no filter is provided
	if (!!!filter) return <>{props.text}</>;

	try {
		// Split text on highlight term, include term itself into parts, ignore case
		const parts = React.useMemo(() => text.split(new RegExp(`^(${filter})`, "gi")), [text, filter]);

		return (
			<span>
				{" "}
				{parts.map((part, i) => {
					const className = part.toLowerCase() !== filter.toLowerCase()
						? classNames.rootHighlighted
						: classNames.root;

					return (
						<span key={i} className={className}>
							{part}
						</span>
					);
				})}{" "}
			</span>
		);
	} catch (error) {
		// Return the suggestion if an error occured during the highlighting
		return <>{props.text}</>;
	}
};
