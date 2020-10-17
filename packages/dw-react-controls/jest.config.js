const { createConfig } = require("@dw-react-lib/build/jest/jest-resources");
const path = require("path");

const config = createConfig({
	coverageDirectory: "coverage",
	setupFilesAfterEnv: [path.resolve(path.join(__dirname, "config", "setupTests.js"))],
	transformIgnorePatterns: ["<rootDir>/node_modules/(?!(office-ui-fabric-react/lib)/)"]
});

module.exports = config;
