const createConfig = require("@dw-component-lib/build/jestV2/jest.preset.v8");
const path = require("path");

const config = createConfig({
	coverageDirectory: "coverage",
	setupFilesAfterEnv: [path.resolve(path.join(__dirname, "config", "setupTests.js"))]
});

module.exports = config;
