const configureWebpack = require("@dw-react-lib/build/storybook/webpack.config");

module.exports = {
	addons: ["@storybook/addon-docs", "storybook-addon-react-docgen/register", "storybook-addon-performance/register"],
	webpackFinal: (config) => configureWebpack({ config }),
	stories: ["../**/*.stories.@(ts|tsx|js|jsx)"]
};
