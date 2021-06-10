import { ActionButton, DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { classNamesFunction } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import { ITerm, ITermCreationResult, ITermValue } from "../../models";
import { CollectionUtils } from "../../utils/collectionUtils";
import { TermPicker } from "../TermPicker";
import { ITreeItemAction, TreeItem } from "../TreeItem";
import { TreeView } from "../TreeView";
import { WideDialog } from "../WideDialog";
import {
	ITaxonomyPickerDialogLabels,
	ITaxonomyPickerDialogProps,
	ITaxonomyPickerDialogStyleProps,
	ITaxonomyPickerDialogStyles
} from "./TaxonomyPickerDialog.types";
import { TermAdder } from "./TermAdder";

const getClassNames = classNamesFunction<ITaxonomyPickerDialogStyleProps, ITaxonomyPickerDialogStyles>();
const rootNodeKey = "__ROOTNODE__";
const newNodeKey = "__NEW__";

export const TaxonomyPickerDialogBase: React.FC<ITaxonomyPickerDialogProps> = (props) => {
	const {
		labels: labelsProp,
		allowAddingTerms,
		itemLimit,
		showRootNode,
		rootNodeLabel,
		pickerProps,
		modalProps,
		dialogContentProps,
		defaultSelectedItems,
		onCreateNewTerm,
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
	const [termCreatingParentId, setTermCreatingParentId] = React.useState<string | undefined>(undefined);
	const [expandedNodes, setExpandedNodes] = React.useState<string[]>([
		showRootNode ? rootNodeKey : termTreeItems![0].key
	]);
	const [selectedTreeItem, setSelectedTreeItem] = React.useState<string | null>(null);
	const treeItemActions = React.useRef<ITreeItemAction[]>([]);

	React.useEffect(() => {
		const newTreeItemActions: ITreeItemAction[] = [];

		if (allowAddingTerms) {
			newTreeItemActions.push({
				key: "createNewTerm",
				text: labels.addNewTermAction || "Add new term...",
				onClick: (nodeId: string) => handleStartCreateNewTermAction(nodeId)
			});
		}

		treeItemActions.current = newTreeItemActions;
	}, [allowAddingTerms]);

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

		setSelectedTreeItem(!!nodeId ? nodeId : null);
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

	const handleStartCreateNewTermAction = (nodeId: string): void => {
		setTermCreatingParentId(nodeId);

		if (expandedNodes.indexOf(nodeId) === -1) {
			const newExpanded = expandedNodes || [];
			newExpanded.push(nodeId);

			setExpandedNodes(newExpanded);
		}
	};

	const handleNodeToggle = (ev: React.ChangeEvent, nodeIds?: string[]): void => {
		setExpandedNodes(nodeIds || []);
	};

	const handleCreateNewTerm = async (newValue: string): Promise<void | ITermCreationResult> => {
		if (!termCreatingParentId) {
			throw new Error("Can't add a new term if the parent node is unknown.");
		}

		let result: void | ITermCreationResult = { success: true };
		if (onCreateNewTerm) {
			result = await onCreateNewTerm(termCreatingParentId, newValue);
		}

		if (typeof result === "object" && result.success) {
			// add term
			if (result.newTerm) {
				const parentTerm = findTermInTree(termTreeItems || [], termCreatingParentId);

				if (termCreatingParentId === rootNodeKey) {
					setTermTreeItems([result.newTerm, ...(termTreeItems || [])]);
				} else if (!parentTerm) {
					// do nothing
				} else {
					if (!parentTerm.children) {
						if (result.newTerm) {
							parentTerm.children = [result.newTerm];
						}
					} else {
						parentTerm.children.unshift(result.newTerm);
					}

					setTermTreeItems([...termTreeItems!]);
					setSelectedTreeItem(result.newTerm.key);
					setSelectedTreeNode(result.newTerm);
				}
			}

			setTermCreatingParentId(undefined);
		}

		return result;
	};

	const findTermInTree = (terms: ITerm[], nodeId: string): ITerm | undefined => {
		for (let index = 0; index < terms.length; index++) {
			const term = terms[index];

			if (term.key === nodeId) {
				return term;
			} else if (!!term.children && term.children.length > 0) {
				const match = findTermInTree(term.children, nodeId);

				if (match) {
					return match;
				}
			}
		}
	};

	const renderTreeView = (): JSX.Element | null => {
		if (!showRootNode && !termTreeItems?.length) {
			return null;
		}

		const nodeTree = termTreeItems?.map((term) => renderTreeNode(term)) || [];
		if (termCreatingParentId === rootNodeKey) {
			nodeTree.unshift(
				renderTreeNode({
					key: newNodeKey,
					name: ""
				} as ITerm)
			);
		}

		return (
			<TreeView
				expanded={expandedNodes}
				selected={selectedTreeItem}
				onNodeSelect={handleTreeSelection}
				onNodeToggle={handleNodeToggle}
			>
				{showRootNode ? (
					<TreeItem
						nodeId={rootNodeKey}
						label={rootNodeLabel || ""}
						disabled={true}
						iconName={"DocumentSet"}
						actions={treeItemActions.current}
					>
						{nodeTree}
					</TreeItem>
				) : (
					<>{nodeTree}</>
				)}
			</TreeView>
		);
	};

	const renderTreeNode = (term: ITerm): JSX.Element => {
		const handleNodeInvoke = (event: React.MouseEvent<HTMLElement>) => {
			event.stopPropagation();

			if (!term.disabled) {
				addItemToSelection(term);
			}
		};

		const children = term.children?.map((child) => renderTreeNode(child)) || [];

		if (termCreatingParentId === term.key) {
			children.unshift(
				renderTreeNode({
					key: newNodeKey,
					name: ""
				} as ITerm)
			);
		}

		if (term.key === newNodeKey) {
			return (
				<TermAdder
					key={`${termCreatingParentId}_${term.key}`}
					onSubmit={handleCreateNewTerm}
					onCancel={() => setTermCreatingParentId(undefined)}
					labels={labels.termAdderLabels}
				/>
			);
		}

		return (
			<TreeItem
				key={term.key}
				nodeId={term.key}
				label={term.name}
				disabled={term.disabled}
				iconName={term.disabled ? "TagSolid" : "Tag"}
				onInvoke={handleNodeInvoke}
				actions={treeItemActions.current}
			>
				{children}
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
			<div className={classNames.treeContainer}>{renderTreeView()}</div>
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
