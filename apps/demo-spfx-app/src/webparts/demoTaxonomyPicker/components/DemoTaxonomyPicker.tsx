import {
	ITaxonomyProvider,
	ITermInfo,
	ITermValue,
	TaxonomyPicker,
	TermItemSuggestion
} from "@dlw-digitalworkplace/dw-react-controls";
import { SharePointTaxonomyProvider } from "@dlw-digitalworkplace/taxonomyprovider-sharepoint";
import * as React from "react";
import { WebPartContext } from "../DemoTaxonomyPickerWebPart.types";
import styles from "./DemoTaxonomyPicker.module.scss";
import { IDemoTaxonomyPickerProps } from "./DemoTaxonomyPicker.types";

export const DemoTaxonomyPicker: React.FC<IDemoTaxonomyPickerProps> = (props) => {
	const { allowAddingTerms, allowDeprecatedTerms, preCacheTerms, termSetIdOrName } = props;

	const { siteUrl } = React.useContext(WebPartContext);
	const [selectedItems, setSelectedItems] = React.useState<ITermValue[]>([]);
	const [provider, setProvider] = React.useState<ITaxonomyProvider>();
	const [providerAllowsAddingTerms, setProviderAllowsAddingTerms] = React.useState(false);

	React.useEffect(() => {
		(async () => {
			// tslint:disable-next-line:no-unused-expression
			if (!siteUrl || !termSetIdOrName) {
				console.warn("No provider info present. Please provide the necessary properties.");
				return null;
			}

			console.log("Creating new provider...");

			const spTaxonomyProvider = new SharePointTaxonomyProvider(siteUrl, termSetIdOrName);
			await spTaxonomyProvider.initialize(preCacheTerms);

			setProviderAllowsAddingTerms(spTaxonomyProvider.allowAddingTerms);

			console.log("Provider created and initialized.");

			setProvider(spTaxonomyProvider);
		})();
	}, [preCacheTerms, siteUrl, termSetIdOrName]);

	const getTermSynonyms: (term: ITermInfo) => string[] = (term) => {
		const synonyms: { value: string }[] = (term?.additionalProperties?.synonyms || []).filter(
			(it) => it.value !== term.name
		);

		return synonyms.map((it) => it.value);
	};

	return (
		<div className={styles.demoTaxonomyPicker}>
			<TaxonomyPicker
				allowAddingTerms={allowAddingTerms && providerAllowsAddingTerms}
				allowDeprecatedTerms={allowDeprecatedTerms}
				disabled={!provider}
				onChange={setSelectedItems}
				provider={provider}
				selectedItems={selectedItems}
				dialogProps={{
					dialogContentProps: {
						title: "Pick a Term",
						subText: "Browse the list of terms in the termset."
					},
					rootNodeLabel: "Terms",
					showRootNode: true,
					onRenderTreeItem: (props, defaultRender) => {
						return defaultRender({
							...props,
							onRenderLabelContent: (labelProps, defaultLabelRender) => {
								const synonyms = getTermSynonyms(props.term);

								return (
									<>
										{defaultLabelRender(labelProps)}
										{synonyms.length > 0 && <small>({synonyms.join(", ")})</small>}
									</>
								);
							}
						});
					}
				}}
				termPickerProps={{
					onRenderSuggestionsItem: (props) => (
						<TermItemSuggestion
							term={props}
							onRenderLabel={(props) => {
								return <div>{props.term.name}</div>;
							}}
							onRenderSubText={(props) => {
								const synonyms = getTermSynonyms(props.term);

								return (
									synonyms.length > 0 && (
										<div>
											<small>{synonyms.join(", ")}</small>
										</div>
									)
								);
							}}
						/>
					)
				}}
			/>
		</div>
	);
};
