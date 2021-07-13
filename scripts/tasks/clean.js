// @ts-check

const path = require("path");
const { cleanTask } = require("just-scripts");

exports.clean = cleanTask({
	paths: [
		"coverage",
		"dist",
		"lib",
		"lib-amd",
		"lib-commonjs",
		"node_modules/.cache",
		"src/**/*.scss.ts",
		"temp",
		"tsconfig.tsbuildinfo"
	].map((p) => path.join(process.cwd(), p))
});
