import { ITaxonomyPickerDialogStyleProps, ITaxonomyPickerDialogStyles } from "./TaxonomyPickerDialog.types";

const GlobalClassNames = {
	dialog: "dw-TaxonomyDialog",
	content: "dw-TaxonomyDialog-content",
	treeContainer: "dw-TaxonomyDialog-treeWrapper",
	inputsContainer: "dw-TaxonomyDialog-inputsWrapper",
	addButton: "dw-TaxonomyDialog-add",
	picker: "dw-TaxonomyDialog-picker",
	actions: "dw-TaxonomyDialog-actions"
};

export const getStyles = (props: ITaxonomyPickerDialogStyleProps): ITaxonomyPickerDialogStyles => {
	const { className, contentClassName, theme } = props;
	const classNames = GlobalClassNames;

	return {
		dialog: [
			classNames.dialog,
			{
				selectors: {
					"@media (min-width: 480px)": {
						selectors: {
							".ms-Dialog-main": {
								width: `${Math.round(480 * 0.95)}px`
							}
						}
					},
					"@media (min-width: 640px)": {
						selectors: {
							".ms-Dialog-main": {
								width: "600px"
							}
						}
					}
				}
			},
			className
		],
		content: [classNames.content, contentClassName],
		treeContainer: [
			classNames.treeContainer,
			{
				border: `1px solid ${theme.palette.neutralTertiary}`,
				boxSizing: "border-box",
				height: "350px",
				overflow: "auto",
				padding: theme.spacing.s1,
				selectors: {
					[`+ .${classNames.inputsContainer}`]: {
						marginTop: theme.spacing.l1
					}
				}
			}
		],
		inputsContainer: [
			classNames.inputsContainer,
			{
				display: "flex",
				flexWrap: "wrap",
				selectors: {
					"@media (min-width: 480px)": {
						flexWrap: "nowrap"
					}
				}
			}
		],
		addButton: [
			classNames.addButton,
			{
				flexBasis: "100%",
				selectors: {
					"@media (min-width: 480px)": {
						flexBasis: "auto"
					}
				}
			}
		],
		picker: [
			classNames.picker,
			{
				flexGrow: 1
			}
		],
		actions: [
			classNames.actions,
			{
				selectors: {
					".ms-Dialog-actionsRight": {
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end"
					}
				}
			}
		]
	};
};
