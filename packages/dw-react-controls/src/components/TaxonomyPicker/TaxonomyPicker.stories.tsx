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
					itemLimit={1}
					dialogProps={{
						title: "Browse terms",
						subText:
							"Browse for terms in the term tree to find the item you are looking for. Don't forget to Add it to the picker!",
						showRootNode: true,
						rootNodeLabel: "My terms"
					}}
				/>

				<div style={{ marginTop: "8px" }}>
					<strong>Current selection:</strong>{" "}
					{!!selectedItems && selectedItems.length !== 0 ? selectedItems!.map((it) => it.name).join(", ") : "none"}
				</div>
			</div>
		);
	});
