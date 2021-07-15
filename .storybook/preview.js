import { initializeIcons } from "@uifabric/icons";
import { Fabric, loadTheme } from "office-ui-fabric-react";
import { compareStoryPaths, storiesOrder } from "./previewUtils.js";

const theme = loadTheme({});

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	},
	options: {
		storySort: ([_1, story1], [_2, story2]) => {
			const story1Path = [...story1.kind.split("/"), story1.name].map((key) => key.toLowerCase());
			const story2Path = [...story2.kind.split("/"), story2.name].map((key) => key.toLowerCase());

			return compareStoryPaths(storiesOrder, story1Path, story2Path, false);
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
