import { useStateIfMounted } from "@dlw-digitalworkplace/dw-react-utils";
import { classNamesFunction, IconButton, Spinner, SpinnerSize, TextField } from "@fluentui/react";
import * as React from "react";
import { ITermAdderLabels, ITermAdderProps, ITermAdderStyleProps, ITermAdderStyles } from "./TermAdder.types";

const getClassNames = classNamesFunction<ITermAdderStyleProps, ITermAdderStyles>();

export const TermAdderBase: React.FC<ITermAdderProps> = React.forwardRef<HTMLFormElement, ITermAdderProps>(
	(props, ref) => {
		const { labels: labelsProp, onCancel, onSubmit, styles, className, theme } = props;

		const [inputValue, setInputValue] = React.useState<string | undefined>("");
		const [errorMessage, setErrorMessage] = useStateIfMounted<string | undefined>(undefined);
		const [isSaving, setIsSaving] = useStateIfMounted(false);

		const defaultLabels: ITermAdderLabels = {
			fieldRequiredMessage: "Please enter a value."
		};

		const labels = { ...defaultLabels, ...labelsProp };

		const classNames = getClassNames(styles, { className, theme: theme! });

		const handleSubmit = async (ev: React.FormEvent): Promise<void> => {
			ev.preventDefault();

			if (!inputValue || inputValue.length === 0) {
				setErrorMessage(labels.fieldRequiredMessage);
				return;
			}

			if (onSubmit) {
				setIsSaving(true);

				const result = await onSubmit(inputValue);

				if (typeof result === "object" && !result.success) {
					setErrorMessage(result.error);
				} else {
					setErrorMessage(undefined);
				}

				setIsSaving(false);
			}
		};

		const handleCancel = (_: React.MouseEvent<HTMLButtonElement>): void => {
			if (onCancel) {
				onCancel();
			}
		};

		const handleInputChange = (_: React.FormEvent, newValue?: string): void => {
			setInputValue(newValue);
		};

		return (
			<form ref={ref} className={classNames.termAdder} onSubmit={handleSubmit}>
				<TextField
					autoFocus={true}
					className={classNames.textField}
					errorMessage={errorMessage}
					onChange={handleInputChange}
					underlined={true}
					value={inputValue}
				/>

				{isSaving ? (
					<Spinner size={SpinnerSize.xSmall} className={classNames.spinner} />
				) : (
					<>
						<IconButton iconProps={{ iconName: "StatusCircleCheckmark" }} className={classNames.button} type="submit" />
						<IconButton
							iconProps={{ iconName: "StatusCircleErrorX" }}
							className={classNames.button}
							onClick={handleCancel}
						/>
					</>
				)}
			</form>
		);
	}
);
