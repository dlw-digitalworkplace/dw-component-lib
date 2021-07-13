const path = require("path");
const fs = require("fs");

const { getAllPackageInfo } = require("../scripts/monorepo");

function getStories() {
	const packageInfo = getAllPackageInfo();
	const packagePaths = [];
	Object.keys(packageInfo).forEach((it) => {
		const dirPath = path.resolve(__dirname, "..", packageInfo[it].packagePath, "src");
		if (fs.existsSync(dirPath)) {
			const pathToAdd = path.resolve(dirPath, "**/*.stories.@(js|jsx|ts|tsx|mdx)");
			packagePaths.push(pathToAdd.replace(/\\/g, "/"));
		}
	});

	return packagePaths;
}

module.exports = {
	stories: getStories(),

	addons: [
		"@storybook/addon-links",
		{
			name: "@storybook/addon-essentials",
			options: {
				docs: {
					sourceLoaderOptions: {
						injectStoryParameters: false
					}
				}
			}
		},
		{
			name: "@storybook/addon-storysource",
			options: {
				loaderOptions: {
					injectStoryParameters: false
				}
			}
		}
	],

	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			allowSyntheticDefaultImports: false,
			esModuleInterop: false,
			shouldExtractLiteralValuesFromEnum: true
		}
	}
};
