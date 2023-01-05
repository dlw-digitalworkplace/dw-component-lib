import { Dialog as FUIDialog, IDialogProps, IDialogStyleProps, IDialogStyles, styled } from "@fluentui/react";
import { getStyles } from "@fluentui/react/lib/components/Dialog/Dialog.styles";
import * as React from "react";

const getStylesCustom = (props: IDialogStyleProps) => getStyles({ ...props, dialogDefaultMaxWidth: "95vw" });

/**
 * Custom dialog which allow full screen width,
 * compared to the narrow max-width of the default Fluent UI Dialog control.
 */
export const WideDialog: React.FC<IDialogProps> = styled<IDialogProps, IDialogStyleProps, IDialogStyles>(
	FUIDialog,
	getStylesCustom
);
