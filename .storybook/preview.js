import { initializeIcons } from "@uifabric/icons";
import { Fabric, loadTheme } from "office-ui-fabric-react";

const theme = loadTheme({});

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	},
	previewTabs: { "storybook/docs/panel": { index: -1 } }
};

export const decorators = [
	(Story) => (
		<Fabric theme={theme}>
			<Story />
		</Fabric>
	)
];

initializeIcons();
