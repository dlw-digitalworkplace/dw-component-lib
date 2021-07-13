// @ts-check

const fs = require("fs-extra");
const path = require("path");
const merge = require("../merge");
const resolve = require("resolve");
const { findRepoDeps } = require("../monorepo/index");
const findConfig = require("../find-config");

const packageJsonPath = findConfig("package.json");
const packageRoot = path.dirname(packageJsonPath);

const jestAliases = () => {
	// Get deps of the current package within the repo
	const packageDeps = findRepoDeps();

	const aliases = {};

	for (const { packageJson } of packageDeps) {
		const { name, main } = packageJson;
		if (main && main.includes("lib-commonjs")) {
			// Map package root and lib imports to the commonjs version
			const mainImportPath = `${name}/${main.replace(".js", "")}`;
			aliases[`^${name}$`] = mainImportPath;
			aliases[`^${name}/lib/(.*)$`] = mainImportPath.replace("index", "$1");
		}
	}

	// Special aliases to look at src for the current package
	const packageJson = fs.readJSONSync(packageJsonPath);
	aliases[`^${packageJson.name}$`] = "<rootDir>/src/";
	aliases[`^${packageJson.name}/lib/(.*)$`] = "<rootDir>/src/$1";

	return aliases;
};

module.exports = {
	createRawConfig: () => ({
		rootDir: "lib",
		testRegex: "(/__tests__/.*|\\.(test|spec))\\.js$"
	}),
	jestAliases,
	createConfig: (customConfig) =>
		merge(
			{
				globals: {
					"ts-jest": {
						tsConfig: path.resolve(packageRoot, "tsconfig.json"),
						packageJson: path.resolve(packageRoot, "package.json"),
						diagnostics: false
					}
				},
				moduleDirectories: [
					"node_modules",
					path.resolve(packageRoot, "node_modules"),
					path.resolve(__dirname, "../node_modules")
				],
				moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
				moduleNameMapper: {
					"office-ui-fabric-react/lib/(.*)$": "office-ui-fabric-react/lib-commonjs/$1",
					"ts-jest": resolve.sync("ts-jest"),
					"\\.(scss)$": path.resolve(__dirname, "jest-style-mock.js"),
					KeyCodes: path.resolve(__dirname, "jest-mock.js"),
					...jestAliases()
				},
				reporters: [path.resolve(__dirname, "./jest-reporter.js")],
				setupFiles: [path.resolve(__dirname, "jest-setup.js")],
				testEnvironment: "jsdom",
				testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
				testURL: "http://localhost",
				transform: {
					// ".(ts|tsx)": resolve.sync("ts-jest/dist"),
					"^.+\\.(ts|tsx)$": resolve.sync("ts-jest/dist")
				},
				transformIgnorePatterns: ["/node_modules/", "/lib-commonjs/", "\\.js$"],
				watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"]
			},
			customConfig
		)
};
