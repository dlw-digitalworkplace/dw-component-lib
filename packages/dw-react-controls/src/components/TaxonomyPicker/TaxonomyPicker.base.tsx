import { useStateIfMounted } from "@dlw-digitalworkplace/dw-react-utils";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { ValidationState } from "office-ui-fabric-react/lib/components/pickers/BasePicker.types";
import { Label } from "office-ui-fabric-react/lib/Label";
import { classNamesFunction, IRenderFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { composeRenderFunction } from "../../utilities";
import { ITermValue, TermPicker } from "../TermPicker";
import { ITerm, ITermCreationResult, ITermFilterOptions } from "./models";
import {
	ITaxonomyPickerDialogButtonProps,
	ITaxonomyPickerProps,
	ITaxonomyPickerStyleProps,
	ITaxonomyPickerStyles
} from "./TaxonomyPicker.types";
import { TaxonomyPickerDialog } from "./TaxonomyPickerDialog";

const getClassNames = classNamesFunction<ITaxonomyPickerStyleProps, ITaxonomyPickerStyles>();
const tempItemKey = "__TEMP__ITEM__";

export const TaxonomyPickerBase: React.FC<ITaxonomyPickerProps> = ({
	allowAddingTerms,
	allowDeprecatedTerms,
	allowDisabledTerms,
	className,
	disabled,
	errorMessage: errorMessageProp,
	itemLimit,
	label,
	labelProps,
	dialogProps,
	provider,
	selectedItems,
	onChange,
	onGetErrorMessage,
	onReceiveTermCreationFailedMessage,
	onReceiveTermCreationSuccessMessage,
	onRenderOpenDialogButton,
	required,
	styles,
	theme
}) => {
	const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
	const [creationResultMessage, setCreationResultMessage] = useStateIfMounted<{
		isSuccess: boolean;
		message: string | JSX.Element;
	}>(undefined);
	const [isCreatingTerm, setIsCreatingTerm] = useStateIfMounted(false);
	const [_errorMessage, setErrorMessage] = React.useState<string | JSX.Element>();
	const lastValidation = React.useRef(0);

	const creationResultMessageTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined);

	React.useEffect(() => {
		const result = onGetErrorMessage && onGetErrorMessage(selectedItems);

		if (result !== undefined) {
			if (typeof result === "string" || !("then" in result)) {
				setErrorMessage(result);
			} else {
				const currentValidationNumber = ++lastValidation.current;

				result.then((errMsg: string | JSX.Element) => {
					if (currentValidationNumber === lastValidation.current) {
						setErrorMessage(errMsg);
					}
				});
			}
		}
	}, [onGetErrorMessage, selectedItems]);

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
		clearCreationResultMessage();

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
		clearCreationResultMessage();

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
			clearCreationResultMessage();

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
					showCreationSuccessMessage(value, "The term has been created successfully.");
				},
				(err) => {
					// parse the error message from the result
					const error =
						typeof err === "object" && Object.keys(err).some((k) => k === "message") ? err.message : err.toString();

					// set the error message
					showCreationFailedMessage(value, error);

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

	const showCreationFailedMessage = (newValue: string, error: string): void => {
		let finalError: string | JSX.Element = error;

		// override the error message when callback is specified
		if (onReceiveTermCreationFailedMessage) {
			finalError = onReceiveTermCreationFailedMessage(newValue, error);
		}

		// clear the message timeout if it exists
		if (creationResultMessageTimeout.current) {
			clearTimeout(creationResultMessageTimeout.current);
		}

		// set the error message
		setCreationResultMessage({ isSuccess: false, message: finalError });
	};

	const showCreationSuccessMessage = (newValue: string, message: string): void => {
		let finalMessage: string | JSX.Element = message;

		// override the success message when callback is specified
		if (onReceiveTermCreationSuccessMessage) {
			finalMessage = onReceiveTermCreationSuccessMessage(newValue, finalMessage);
		}

		// set the success message
		setCreationResultMessage({ isSuccess: true, message: finalMessage });

		// start a timeout to clear the success message
		creationResultMessageTimeout.current = setTimeout(() => {
			clearCreationResultMessage();
		}, 5000);
	};

	const clearCreationResultMessage = () => {
		// clear the timeout if present
		if (!!creationResultMessageTimeout.current) {
			clearTimeout(creationResultMessageTimeout.current);
		}

		// clear the success message
		setCreationResultMessage(undefined);
	};

	const renderMessage = React.useCallback(
		(message: string | JSX.Element, isSuccess: boolean) => {
			return typeof message === "string" ? (
				<p className={isSuccess ? classNames.successMessage : classNames.errorMessage}>
					<span data-automation-id={isSuccess ? "success-message" : "error-message"}>{message}</span>
				</p>
			) : (
				<div
					className={isSuccess ? classNames.successMessage : classNames.errorMessage}
					data-automation-id={isSuccess ? "success-message" : "error-message"}
				>
					{message}
				</div>
			);
		},
		[classNames.successMessage, classNames.errorMessage]
	);

	const errorMessage = React.useMemo(() => _errorMessage || errorMessageProp, [_errorMessage, errorMessageProp]);

	const renderOpenDialogButton: IRenderFunction<ITaxonomyPickerDialogButtonProps> = (
		props?: ITaxonomyPickerDialogButtonProps
	) => {
		return props ? (
			<IconButton
				disabled={props.disabled}
				iconProps={{
					iconName: "TagUnknown12"
				}}
				onClick={props.onButtonClick}
			/>
		) : null;
	};

	const finalOnRenderOpenDialogButton = onRenderOpenDialogButton
		? composeRenderFunction(onRenderOpenDialogButton, renderOpenDialogButton)
		: renderOpenDialogButton;

	return (
		<div className={classNames.root}>
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
					isInvalid={!!errorMessage ? true : undefined}
					itemLimit={itemLimit}
					onChange={handleSelectionChange}
					onResolveSuggestions={onResolveSuggestions}
					onValidateInput={onValidateInput}
					selectedItems={selectedItems}
				/>
				{finalOnRenderOpenDialogButton({
					disabled: !!disabled,
					onButtonClick: handlePopupButtonClick
				})}
			</div>

			{errorMessage && renderMessage(errorMessage, false)}

			{creationResultMessage && renderMessage(creationResultMessage.message, creationResultMessage.isSuccess)}

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
