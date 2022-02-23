import { PeoplePicker, PeoplePickerValue } from "@dlw-digitalworkplace/dw-react-controls";
import * as React from "react";
import styles from "./DemoPeoplePicker.module.scss";
import { IDemoPeoplePickerProps } from "./DemoPeoplePicker.types";

export const DemoPeoplePicker: React.FC<IDemoPeoplePickerProps> = (props) => {
	const { provider } = props;

	const [selectedItems, setSelectedItems] = React.useState<PeoplePickerValue[]>([]);

	return (
		<div className={styles.demoPeoplePicker}>
			<PeoplePicker
				disabled={!provider}
				label={"Demo people picker"}
				errorMessage={!provider && "Please configure a provider for this People Picker."}
				onChange={setSelectedItems}
				provider={provider}
				required={true}
				resolveDelay={200}
				selectedItems={selectedItems}
			/>

			<pre>{JSON.stringify(selectedItems, null, 2)}</pre>
		</div>
	);
};
