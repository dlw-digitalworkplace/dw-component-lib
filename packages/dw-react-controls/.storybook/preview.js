import { addDecorator } from "@storybook/react";
import { initializeIcons } from "@uifabric/icons";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import * as React from "react";
import { withPerformance } from "storybook-addon-performance";
import { withPropsTable } from "storybook-addon-react-docgen";

addDecorator(withPropsTable);
addDecorator(withPerformance);
addDecorator((Story) => (
	<Fabric>
		<Story />
	</Fabric>
));

initializeIcons();
