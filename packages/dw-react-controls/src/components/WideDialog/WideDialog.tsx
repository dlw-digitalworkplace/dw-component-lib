import { getStyles } from "office-ui-fabric-react/lib/components/Dialog/Dialog.styles";
import { Dialog as FUIDialog, IDialogProps, IDialogStyleProps, IDialogStyles } from "office-ui-fabric-react/lib/Dialog";
import { styled } from "office-ui-fabric-react/lib/Utilities";
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
