import { findInTree, flatten } from "@dlw-digitalworkplace/dw-react-utils";
import {
	ActionButton,
	DefaultButton,
	DialogFooter,
	IRenderFunction,
	PrimaryButton,
	classNamesFunction,
	composeRenderFunction
} from "@fluentui/react";
import * as React from "react";
import * as rfdc from "rfdc";
import { ITermValue, TermPicker } from "../../TermPicker";
import { ITreeItemAction, ITreeItemProps, TreeItem } from "../../TreeItem";
import { TreeView } from "../../TreeView";
import { WideDialog } from "../../WideDialog";
import { TermAdder } from "../TermAdder";
import { ITerm, ITermCreationResult, ITermFilterOptions } from "../models";
import {
	ITaxonomyPickerDialogLabels,
	ITaxonomyPickerDialogProps,
	ITaxonomyPickerDialogStyleProps,
	ITaxonomyPickerDialogStyles
} from "./TaxonomyPickerDialog.types";

const getClassNames = classNamesFunction<ITaxonomyPickerDialogStyleProps, ITaxonomyPickerDialogStyles>();
const rootNodeKey = "__ROOTNODE__";
const newNodeKey = "__NEW__";

export const TaxonomyPickerDialogBase: React.FC<ITaxonomyPickerDialogProps> = (props) => {
	const {
		labels: labelsProp,
		allowAddingTerms,
		defaultSelectedItems,
		dialogContentProps,
		itemLimit,
		modalProps,
		onConfirm,
		onCreateNewTerm,
		onDismiss,
		onRenderTreeItem,
		pickerProps,
		provider,
		rootNodeLabel,
		showRootNode,
		styles,
		theme,
		trimDeprecatedTerms,
		trimUnavailableTerms,
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
	const [expandedNodes, setExpandedNodes] = React.useState<string[]>([]);
	const [selectedTreeItem, setSelectedTreeItem] = React.useState<string | null>(null);
	const [treeItemActions, setTreeItemActions] = React.useState<ITreeItemAction[]>([]);

	React.useEffect(() => {
		const newTreeItemActions: ITreeItemAction[] = [];

		if (allowAddingTerms) {
			newTreeItemActions.push({
				key: "createNewTerm",
				text: labels.addNewTermAction || "Add new term...",
				onClick: (nodeId: string) => handleStartCreateNewTermAction(nodeId)
			});
		}

		setTreeItemActions(newTreeItemActions);
	}, [allowAddingTerms]);

	React.useEffect(() => {
		(async () => {
			const filterOptions: Partial<ITermFilterOptions> = {};

			if (trimDeprecatedTerms !== undefined) {
				filterOptions.trimDeprecated = trimDeprecatedTerms;
			}

			if (trimUnavailableTerms !== undefined) {
				filterOptions.trimUnavailable = trimUnavailableTerms;
			}

			const terms = rfdc()(await provider.getTermTree(filterOptions));

			setTermTreeItems(terms);
			setExpandedNodes(showRootNode ? [rootNodeKey] : terms && terms.length > 0 ? [terms[0].key] : []);
		})();
	}, [provider, showRootNode, rootNodeKey, trimDeprecatedTerms, trimUnavailableTerms]);

	React.useEffect(() => {
		if (!termTreeItems) {
			setFlattenedTermTreeItems(termTreeItems);
			return;
		}

		const flattened = flatten(termTreeItems);

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

		setExpandedNodes((current) => {
			const newExpanded = [...current];

			if (current.indexOf(nodeId) === -1) {
				newExpanded.push(nodeId);
			}

			return newExpanded;
		});
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
			result = await onCreateNewTerm(newValue, termCreatingParentId !== rootNodeKey ? termCreatingParentId : undefined);
		}

		if (typeof result === "object" && result.success) {
			// add term
			if (result.newTerm) {
				const parentTerm = findInTree(termTreeItems || [], (it: ITerm) => it.key === termCreatingParentId);

				if (termCreatingParentId === rootNodeKey) {
					setTermTreeItems([result.newTerm, ...(termTreeItems || [])]);
				} else if (!!parentTerm) {
					if (!parentTerm.children) {
						if (result.newTerm) {
							parentTerm.children = [result.newTerm];
						}
					} else {
						parentTerm.children = [result.newTerm, ...parentTerm.children];
					}

					setTermTreeItems([...termTreeItems!]);
				}

				setSelectedTreeItem(result.newTerm.key);
				setSelectedTreeNode(result.newTerm);
			}

			setTermCreatingParentId(undefined);
		}

		return result;
	};

	const handleCancelTermCreation = (): void => {
		setTermCreatingParentId(undefined);
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
				disabledChildrenEnabled={true}
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
						actions={treeItemActions}
					>
						{nodeTree}
					</TreeItem>
				) : (
					<>{nodeTree}</>
				)}
			</TreeView>
		);
	};

	const renderTreeNode = (term: ITerm): JSX.Element | null => {
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
					onCancel={handleCancelTermCreation}
					labels={labels.termAdderLabels}
				/>
			);
		}

		return (
			<React.Fragment key={term.key}>
				{renderTreeItem({
					actions: treeItemActions,
					children: children,
					disabled: term.disabled,
					iconName: term.disabled ? "TagSolid" : "Tag",
					label: term.name,
					nodeId: term.key,
					onInvoke: handleNodeInvoke,
					term: term
				})}
			</React.Fragment>
		);
	};

	const defaultRenderTreeItem: IRenderFunction<ITreeItemProps & { term?: ITerm }> = (
		treeItemProps: ITreeItemProps & { term: ITerm }
	) => {
		const { term, ...treeItemRest } = treeItemProps;

		return <TreeItem {...treeItemRest} />;
	};

	const renderTreeItem = onRenderTreeItem
		? composeRenderFunction(onRenderTreeItem, defaultRenderTreeItem)
		: defaultRenderTreeItem;

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
