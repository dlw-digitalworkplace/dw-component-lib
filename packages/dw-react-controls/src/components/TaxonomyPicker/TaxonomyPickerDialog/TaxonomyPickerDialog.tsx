import { styled } from "@fluentui/react";
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
