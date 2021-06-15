import { ValidationState } from "office-ui-fabric-react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { ITermCreationResult, ITermValue } from "../../models";
import { ITerm } from "../../models/ITerm";
import { TermPicker } from "../TermPicker";
import { ITaxonomyPickerProps, ITaxonomyPickerStyleProps, ITaxonomyPickerStyles } from "./TaxonomyPicker.types";
import { TaxonomyPickerDialog } from "./TaxonomyPickerDialog";

const getClassNames = classNamesFunction<ITaxonomyPickerStyleProps, ITaxonomyPickerStyles>();

export const TaxonomyPickerBase: React.FC<ITaxonomyPickerProps> = ({
	allowAddingTerms,
	className,
	disabled,
	itemLimit,
	label,
	labelProps,
	dialogProps,
	provider,
	selectedItems,
	onChange,
	required,
	styles
}) => {
	const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

	const classNames = getClassNames(styles, { className });

	const handleSelectionChange = (items?: ITermValue[]): void => {
		if (onChange) {
			onChange(items || []);
		}
	};

	const handlePopupButtonClick = (): void => {
		setDialogIsOpen(true);
	};

	const handleDialogConfirm = (items?: ITermValue[]): void => {
		handleSelectionChange(items);

		setDialogIsOpen(false);
	};

	const handleDialogDismiss = (): void => {
		setDialogIsOpen(false);
	};

	const handleCreateNewTerm = async (newValue: string, parentNodeId?: string): Promise<void | ITermCreationResult> => {
		try {
			const newTerm = await provider.createTerm(newValue, parentNodeId);

			return {
				success: true,
				newTerm
			};
		} catch (err) {
			return {
				success: false,
				error: typeof err === "object" && Object.keys(err).some((k) => k === "message") ? err.message : err.toString()
			};
		}
	};

	const onResolveSuggestions = async (filter: string, currentSelection?: ITerm[]): Promise<ITerm[]> => {
		const availableItems = await provider.getTerms();

		const suggestions = availableItems
			.filter((it) => it.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1) // filter on search text
			.filter((it) => !currentSelection?.some((si) => si.key === it.key)); // filter out selected items

		return suggestions;
	};

	const onValidateInput = (input: string): ValidationState => {
		if (!!provider.termValidationRegex) {
			return provider.termValidationRegex.test(input) ? ValidationState.valid : ValidationState.invalid;
		}

		return ValidationState.valid;
	};

	const onCreateGenericItem = (value: string): ITermValue => {
		return {
			key: value,
			name: value
		};
	};

	return (
		<div className={classNames.taxonomyPicker}>
			{label && (
				<Label required={required} {...labelProps}>
					{label}
				</Label>
			)}

			<div className={classNames.inputWrapper}>
				<TermPicker
					className={classNames.input}
					createGenericItem={onCreateGenericItem}
					disabled={disabled}
					itemLimit={itemLimit}
					onChange={handleSelectionChange}
					onResolveSuggestions={onResolveSuggestions}
					onValidateInput={onValidateInput}
					selectedItems={selectedItems}
				/>
				<IconButton
					disabled={disabled}
					iconProps={{
						iconName: "TagUnknown12"
					}}
					onClick={handlePopupButtonClick}
				/>
			</div>

			{dialogIsOpen && (
				<TaxonomyPickerDialog
					{...dialogProps}
					provider={provider}
					allowAddingTerms={allowAddingTerms}
					defaultSelectedItems={selectedItems}
					hidden={!dialogIsOpen}
					itemLimit={itemLimit}
					onCreateNewTerm={handleCreateNewTerm}
					onConfirm={handleDialogConfirm}
					onDismiss={handleDialogDismiss}
					pickerProps={{ onResolveSuggestions: onResolveSuggestions }}
				/>
			)}
		</div>
	);
};
