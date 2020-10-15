import { ActionButton, DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { ITerm, ITermValue } from "../../models";
import { CollectionUtils } from "../../utils/collectionUtils";
import { TermPicker } from "../TermPicker";
import { TreeItem } from "../TreeItem";
import { TreeView } from "../TreeView";
import { WideDialog } from "../WideDialog";
import {
	ITaxonomyPickerDialogLabels,
	ITaxonomyPickerDialogProps,
	ITaxonomyPickerDialogStyleProps,
	ITaxonomyPickerDialogStyles
} from "./TaxonomyPickerDialog.types";

const getClassNames = classNamesFunction<ITaxonomyPickerDialogStyleProps, ITaxonomyPickerDialogStyles>();

export const TaxonomyPickerDialogBase: React.FC<ITaxonomyPickerDialogProps> = (props) => {
	const {
		labels: labelsProp,
		itemLimit,
		showRootNode,
		rootNodeLabel,
		pickerProps,
		modalProps,
		dialogContentProps,
		defaultSelectedItems,
		onConfirm,
		onDismiss,
		provider,
		styles,
		theme,
		...rest
	} = props;
	const { className: modalClassName } = modalProps || {};
	const { className: contentClassName } = dialogContentProps || {};

	const defaultLabels: ITaxonomyPickerDialogLabels = {
		addButton: "Add",
		cancelButton: "Cancel",
		okButton: "OK",
		replaceButton: "Replace"
	};

	const labels = { ...defaultLabels, ...labelsProp };

	const [selectedItems, setSelectedItems] = React.useState(defaultSelectedItems || []);
	const [termTreeItems, setTermTreeItems] = React.useState<ITerm[] | undefined>(undefined);
	const [flattenedTermTreeItems, setFlattenedTermTreeItems] = React.useState<ITerm[] | undefined>(undefined);
	const [selectedTreeNode, setSelectedTreeNode] = React.useState<ITerm | undefined>(undefined);

	React.useEffect(() => {
		(async () => {
			const terms = await provider.getTermTree();

			setTermTreeItems(terms);
		})();
	}, [provider]);

	React.useEffect(() => {
		if (!termTreeItems) {
			setFlattenedTermTreeItems(termTreeItems);
			return;
		}

		const flattened = CollectionUtils.flatten(termTreeItems);

		setFlattenedTermTreeItems(flattened);

		console.log(flattened);
	}, [termTreeItems]);

	const classNames = getClassNames(styles, { className: modalClassName, contentClassName, theme: theme! });

	const addItemToSelection = (item: ITerm): void => {
		if (selectedItems.filter((it) => it.key === item.key).length !== 0) {
			return;
		}

		if (itemLimit !== undefined && itemLimit !== 1 && selectedItems.length >= itemLimit) {
			return;
		}

		const newSelectedItems = itemLimit === 1 ? [item] : [...selectedItems, item];

		setSelectedItems(newSelectedItems);
	};

	const closeDialog = (): void => {
		if (onDismiss) {
			onDismiss();
		}
	};

	const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		if (!selectedTreeNode) {
			return;
		}

		addItemToSelection(selectedTreeNode);
	};

	const handleTreeSelection = (event: React.MouseEvent<HTMLButtonElement>, nodeId?: string): void => {
		const treeItem = !!nodeId ? flattenedTermTreeItems?.filter((it) => it.key === nodeId)[0] : undefined;

		setSelectedTreeNode(treeItem);
	};

	const handlePickerChange = (items?: ITermValue[]): void => {
		setSelectedItems(items || []);
	};

	const handleCancelButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		closeDialog();
	};

	const handleOKButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
		if (onConfirm) {
			onConfirm(selectedItems);
		}

		closeDialog();
	};

	const renderTreeContent = (): JSX.Element => {
		const nodeTree = termTreeItems?.map((term) => renderTreeNode(term));

		return showRootNode ? (
			<TreeItem nodeId={"0"} label={rootNodeLabel || ""} disabled={true} iconName={"DocumentSet"}>
				{nodeTree}
			</TreeItem>
		) : (
			<>{nodeTree}</>
		);
	};

	const renderTreeNode = (term: ITerm): JSX.Element => {
		const handleNodeInvoke = (event: React.MouseEvent<HTMLElement>) => {
			event.stopPropagation();

			if (!term.disabled) {
				addItemToSelection(term);
			}
		};

		return (
			<TreeItem
				key={term.key}
				nodeId={term.key}
				label={term.name}
				disabled={term.disabled}
				iconName={term.disabled ? "TagSolid" : "Tag"}
				onInvoke={handleNodeInvoke}
			>
				{term.children?.map((child) => renderTreeNode(child))}
			</TreeItem>
		);
	};

	return (
		<WideDialog
			{...rest}
			onDismiss={onDismiss}
			modalProps={{ ...modalProps, className: classNames.dialog, topOffsetFixed: true }}
			dialogContentProps={{ ...dialogContentProps, className: classNames.content }}
		>
			<div className={classNames.treeContainer}>
				<TreeView onNodeSelect={handleTreeSelection}>{renderTreeContent()}</TreeView>
			</div>
			<div className={classNames.inputsContainer}>
				<DefaultButton className={classNames.addButton} onClick={handleAddButtonClick} disabled={!selectedTreeNode}>
					{itemLimit === 1 && selectedItems.length !== 0 ? labels.replaceButton : labels.addButton}
				</DefaultButton>
				<TermPicker
					{...pickerProps}
					className={classNames.picker}
					itemLimit={itemLimit}
					selectedItems={selectedItems}
					onChange={handlePickerChange}
				/>
			</div>

			<DialogFooter className={classNames.actions}>
				<ActionButton text={labels.cancelButton} onClick={handleCancelButtonClick} />
				<PrimaryButton text={labels.okButton} onClick={handleOKButtonClick} />
			</DialogFooter>
		</WideDialog>
	);
};
