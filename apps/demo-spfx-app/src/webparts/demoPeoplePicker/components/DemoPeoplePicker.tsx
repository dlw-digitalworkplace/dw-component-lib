import { MockPeoplePickerProvider, PeoplePicker, PeoplePickerValue } from "@dlw-digitalworkplace/dw-react-controls";
import * as React from "react";
import styles from "./DemoPeoplePicker.module.scss";
import { IDemoPeoplePickerProps } from "./DemoPeoplePicker.types";

export const DemoPeoplePicker: React.FC<IDemoPeoplePickerProps> = (props) => {
	const [selectedItems, setSelectedItems] = React.useState<PeoplePickerValue[]>([]);

	const provider = new MockPeoplePickerProvider();

	return (
		<div className={styles.demoPeoplePicker}>
			<PeoplePicker
				label={"Demo people picker"}
				errorMessage={selectedItems.length === 0 && "Please select at least one person"}
				onChange={setSelectedItems}
				provider={provider}
				required={true}
				selectedItems={selectedItems}
			/>
		</div>
	);
};
