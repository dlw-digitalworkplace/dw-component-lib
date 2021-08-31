const { createConfig } = require("@dw-component-lib/build/jest/jest-resources");
const path = require("path");

const findConfig = require("@dw-component-lib/build/find-config");

const packageJsonPath = findConfig("package.json");
const packageRoot = path.dirname(packageJsonPath);

const config = createConfig({
	coverageDirectory: "coverage",
	globals: {
		"ts-jest": {
			diagnostics: {
				ignoreCodes: "TS151001"
			},
			tsConfig: path.resolve(packageRoot, "tsconfig.test.json")
		}
	},
	moduleNameMapper: {
		DWControlStrings: "identity-obj-proxy"
	},
	setupFilesAfterEnv: [path.resolve(path.join(__dirname, "config", "setupTests.js"))],
	transformIgnorePatterns: ["<rootDir>/node_modules/(?!(office-ui-fabric-react/lib)/)"]
});

module.exports = config;
