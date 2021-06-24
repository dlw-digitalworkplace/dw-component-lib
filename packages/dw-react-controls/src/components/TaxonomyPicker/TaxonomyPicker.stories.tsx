import { useStateIfMounted } from "@dlw-digitalworkplace/dw-react-utils";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ITermValue } from "../../models";
import { MockTaxonomyProvider } from "./providers";
import { TaxonomyPicker } from "./TaxonomyPicker";

storiesOf("TaxonomyPicker", module)
	.addParameters({ component: TaxonomyPicker })
	.add("Basic", () => {
		const [selectedItems, setSelectedItems] = useStateIfMounted<ITermValue[]>([]);

		const taxonomyProvider = new MockTaxonomyProvider();

		const getErrorMessage = React.useCallback((error: string) => {
			return (
				<>
					<b>Error:&nbsp;</b> {error}
				</>
			);
		}, []);

		const getSuccessMessage = React.useCallback((message: string, newValue: string) => {
			return (
				<>
					<b>Success:&nbsp;</b> {message} (term: {newValue})
				</>
			);
		}, []);

		return (
			<div>
				<TaxonomyPicker
					label={"Choose a value"}
					provider={taxonomyProvider}
					required={true}
					selectedItems={selectedItems || []}
					onChange={setSelectedItems}
					itemLimit={3}
					allowAddingTerms={true}
					dialogProps={{
						title: "Browse terms",
						showRootNode: true,
						rootNodeLabel: "My terms",
						dialogContentProps: {
							subText:
								"Browse for terms in the term tree to find the item you are looking for. Don't forget to Add it to the picker!"
						}
					}}
					onGetErrorMessage={getErrorMessage}
					onGetSuccessMessage={getSuccessMessage}
				/>

				<div style={{ marginTop: "8px" }}>
					<strong>Current selection:</strong>{" "}
					{!!selectedItems && selectedItems.length !== 0 ? selectedItems!.map((it) => it.name).join(", ") : "none"}
				</div>
			</div>
		);
	});
