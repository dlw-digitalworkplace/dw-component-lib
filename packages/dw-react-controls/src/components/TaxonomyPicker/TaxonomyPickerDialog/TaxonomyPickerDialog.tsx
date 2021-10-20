import { styled } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { TaxonomyPickerDialogBase } from "./TaxonomyPickerDialog.base";
import { getStyles } from "./TaxonomyPickerDialog.styles";
import {
	ITaxonomyPickerDialogProps,
	ITaxonomyPickerDialogStyleProps,
	ITaxonomyPickerDialogStyles
} from "./TaxonomyPickerDialog.types";

export const TaxonomyPickerDialog: React.FC<ITaxonomyPickerDialogProps> = styled<
	ITaxonomyPickerDialogProps,
	ITaxonomyPickerDialogStyleProps,
	ITaxonomyPickerDialogStyles
>(TaxonomyPickerDialogBase, getStyles);
