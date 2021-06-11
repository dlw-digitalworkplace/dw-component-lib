import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ITermValue } from "../../models";
import { MockTaxonomyProvider } from "./providers";
import { TaxonomyPicker } from "./TaxonomyPicker";

storiesOf("TaxonomyPicker", module)
	.addParameters({ component: TaxonomyPicker })
	.add("Basic", () => {
		const [selectedItems, setSelectedItems] = React.useState<ITermValue[]>([]);

		const taxonomyProvider = new MockTaxonomyProvider();

		return (
			<div>
				<TaxonomyPicker
					label={"Choose a value"}
					provider={taxonomyProvider}
					required={true}
					selectedItems={selectedItems}
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
				/>

				<div style={{ marginTop: "8px" }}>
					<strong>Current selection:</strong>{" "}
					{!!selectedItems && selectedItems.length !== 0 ? selectedItems!.map((it) => it.name).join(", ") : "none"}
				</div>
			</div>
		);
	});
