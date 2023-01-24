const webpack = require("webpack");

module.exports = {
	stories: ["../**/*.stories.@(js|jsx|ts|tsx|mdx)"],

	addons: [
		"@storybook/addon-links",
		{
			name: "@storybook/addon-essentials",
			options: {
				docs: {
					sourceLoaderOptions: {
						injectStoryParameters: false,
						transcludeMarkdown: true
					}
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
	},

	webpackFinal: async (config) => {
		if (!config.plugins) {
			config.plugins = [];
		}

		config.plugins.push(
			new webpack.ProvidePlugin({
				React: "react"
			})
		);

		return config;
	}
};
