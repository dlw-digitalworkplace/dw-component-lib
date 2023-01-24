import { styled } from "@fluentui/react";
import * as React from "react";
import { TaxonomyPickerBase } from "./TaxonomyPicker.base";
import { getStyles } from "./TaxonomyPicker.styles";
import { ITaxonomyPickerProps, ITaxonomyPickerStyleProps, ITaxonomyPickerStyles } from "./TaxonomyPicker.types";

export const TaxonomyPicker: React.FC<ITaxonomyPickerProps> = styled<
	ITaxonomyPickerProps,
	ITaxonomyPickerStyleProps,
	ITaxonomyPickerStyles
>(TaxonomyPickerBase, getStyles);
