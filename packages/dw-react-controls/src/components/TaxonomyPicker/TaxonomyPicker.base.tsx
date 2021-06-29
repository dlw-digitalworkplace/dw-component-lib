import { useStateIfMounted } from "@dlw-digitalworkplace/dw-react-utils";
import { ValidationState } from "office-ui-fabric-react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { ITermValue, TermPicker } from "../TermPicker";
import { ITerm, ITermCreationResult, ITermFilterOptions } from "./models";
import { ITaxonomyPickerProps, ITaxonomyPickerStyleProps, ITaxonomyPickerStyles } from "./TaxonomyPicker.types";
import { TaxonomyPickerDialog } from "./TaxonomyPickerDialog";

const getClassNames = classNamesFunction<ITaxonomyPickerStyleProps, ITaxonomyPickerStyles>();
const tempItemKey = "__TEMP__ITEM__";

export const TaxonomyPickerBase: React.FC<ITaxonomyPickerProps> = ({
	allowAddingTerms,
	allowDeprecatedTerms,
	allowDisabledTerms,
	className,
	disabled,
	itemLimit,
	label,
	labelProps,
	dialogProps,
	provider,
	selectedItems,
	onChange,
	onGetErrorMessage,
	onGetSuccessMessage,
	required,
	styles,
	theme
}) => {
	const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
	const [errorMessage, setErrorMessage] = useStateIfMounted<string | JSX.Element>(undefined);
	const [successMessage, setSuccessMessage] = useStateIfMounted<string | JSX.Element>(undefined);
	const [isCreatingTerm, setIsCreatingTerm] = useStateIfMounted(false);

	const successMessageTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined);

	const classNames = getClassNames(styles, { className, theme: theme! });

	const handleSelectionChange = (items?: ITermValue[]): void => {
		// remove temporary item from result set, since it's only added as a mandatory retun object
		const actualItems = (items || []).filter((it) => it.key !== tempItemKey);

		if (onChange) {
			onChange(actualItems);
		}
	};

	const handlePopupButtonClick = (): void => {
		// open the dialog
		setDialogIsOpen(true);
	};

	const handleDialogConfirm = (items?: ITermValue[]): void => {
		// change the applied selection
		handleSelectionChange(items);

		// close the dialog
		setDialogIsOpen(false);
	};

	const handleDialogDismiss = (): void => {
		// close the dialog
		setDialogIsOpen(false);
	};

	const handleCreateTermInDialog = async (
		newValue: string,
		parentNodeId?: string
	): Promise<void | ITermCreationResult> => {
		try {
			// create the term
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

	const onResolveSuggestions = (filter: string, currentSelection?: ITerm[]): Promise<ITerm[]> => {
		// clear current status messages
		setErrorMessage(undefined);
		clearSuccessMessage();

		// resolve suggestions
		return doResolveSuggestions(filter, currentSelection);
	};

	const doResolveSuggestions = async (filter: string, currentSelection?: ITerm[]): Promise<ITerm[]> => {
		if (!filter || filter.length === 0) {
			return [];
		}

		const findOptions: Partial<ITermFilterOptions> = {
			keysToIgnore: currentSelection?.map((it) => it.key),
			trimDeprecated: !allowDeprecatedTerms,
			trimUnavailable: !allowDisabledTerms
		};

		// retrieve the available terms
		const suggestions = await provider.findTerms(filter, findOptions);

		return suggestions;
	};

	const onValidateInput = (input: string): ValidationState => {
		// clear any active error message
		setErrorMessage(undefined);

		// check if adding terms is allowed
		if (!allowAddingTerms) {
			return ValidationState.invalid;
		}

		// check if a validation regex is available
		if (!!provider.termValidationRegex) {
			// match the input agains the validation regex
			return provider.termValidationRegex.test(input) ? ValidationState.valid : ValidationState.invalid;
		}

		return ValidationState.valid;
	};

	const onCreateGenericItem = (value: string): ITermValue => {
		// create the term
		const createAction = provider.createTerm(value);

		// check the type which is returned
		if (!!(createAction as Promise<ITerm>).then) {
			// set creation state
			setIsCreatingTerm(true);

			// clear any previous confirmation message
			clearSuccessMessage();

			(createAction as Promise<ITerm>).then(
				(res) => {
					// add new term to the current item set
					const newItems: ITermValue[] = [
						...selectedItems,
						{
							key: res.key,
							name: res.name,
							path: res.path
						}
					];

					// change the current selection
					handleSelectionChange(newItems);

					// reset creation state
					setIsCreatingTerm(false);

					// communicate creation result
					showCreationSuccessMessage("The term has been created successfully.", value);
				},
				(err) => {
					// parse the error message from the result
					const error =
						typeof err === "object" && Object.keys(err).some((k) => k === "message") ? err.message : err.toString();

					// set the error message
					showErrorMessage(error);

					// reset creation state
					setIsCreatingTerm(false);
				}
			);

			// return a dummy item
			return {
				key: tempItemKey,
				name: value
			};
		} else {
			const newTerm = createAction as ITerm;

			return {
				key: newTerm.key,
				name: newTerm.name,
				path: newTerm.path
			};
		}
	};

	const showErrorMessage = (error: string): void => {
		let finalError: string | JSX.Element = error;

		// override the error message when callback is specified
		if (onGetErrorMessage) {
			finalError = onGetErrorMessage(error);
		}

		// set the error message
		setErrorMessage(finalError);
	};

	const showCreationSuccessMessage = (message: string, newValue: string): void => {
		let finalMessage: string | JSX.Element = message;

		// override the success message when callback is specified
		if (onGetSuccessMessage) {
			finalMessage = onGetSuccessMessage(finalMessage, newValue);
		}

		// set the success message
		setSuccessMessage(finalMessage);

		// start a timeout to clear the success message
		successMessageTimeout.current = setTimeout(() => {
			clearSuccessMessage();
		}, 5000);
	};

	const clearSuccessMessage = () => {
		// clear the timeout if present
		if (!!successMessageTimeout.current) {
			clearTimeout(successMessageTimeout.current);
		}

		// clear the success message
		setSuccessMessage(undefined);
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
					disabled={disabled || isCreatingTerm}
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

			{successMessage &&
				(typeof successMessage === "string" ? (
					<p className={classNames.successMessage}>
						<span data-automation-id="success-message">{successMessage}</span>
					</p>
				) : (
					<div className={classNames.successMessage} data-automation-id="success-message">
						{successMessage}
					</div>
				))}

			{errorMessage &&
				(typeof errorMessage === "string" ? (
					<p className={classNames.errorMessage}>
						<span data-automation-id="error-message">{errorMessage}</span>
					</p>
				) : (
					<div className={classNames.errorMessage} data-automation-id="error-message">
						{errorMessage}
					</div>
				))}

			{dialogIsOpen && (
				<TaxonomyPickerDialog
					{...dialogProps}
					provider={provider}
					allowAddingTerms={allowAddingTerms}
					defaultSelectedItems={selectedItems}
					hidden={!dialogIsOpen}
					itemLimit={itemLimit}
					onCreateNewTerm={handleCreateTermInDialog}
					onConfirm={handleDialogConfirm}
					onDismiss={handleDialogDismiss}
					pickerProps={{ onResolveSuggestions: doResolveSuggestions }}
				/>
			)}
		</div>
	);
};
