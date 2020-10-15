const { task, series, parallel, condition, option, argv, addResolvePath, resolveCwd } = require("just-scripts");

const { clean } = require("./tasks/clean");
const { copy } = require("./tasks/copy");
const { postprocessTask } = require("./tasks/postprocess");
const { postprocessAmdTask } = require("./tasks/postprocess-amd");
const { postprocessCommonjsTask } = require("./tasks/postprocess-commonjs");
const { sass } = require("./tasks/sass");
const { startStorybookTask } = require("./tasks/storybookTask");
const { ts } = require("./tasks/ts");

const basicPreset = () => {
	// this adds a resolve path for the build tooling deps like TS from the scripts folder
	addResolvePath(__dirname);

	option("production");

	// Build only commonjs (not other TS variants) but still run other tasks
	option("commonjs");

	option("fast");
};

module.exports = () => {
	basicPreset();

	task("clean", clean);
	task("copy", copy);
	task("sass", sass);

	task("storybook:start", startStorybookTask());

	task("ts:postprocess", postprocessTask());
	task("ts:postprocess:amd", postprocessAmdTask);
	task("ts:postprocess:commonjs", postprocessCommonjsTask);

	task("ts:commonjs", series(ts.commonjs, "ts:postprocess:commonjs"));
	task("ts:esm", ts.esm);
	task("ts:amd", series(ts.amd, "ts:postprocess:amd"));

	task("ts:compile", () => {
		return argv().commonjs
			? "ts:commonjs-only"
			: parallel(
					condition("ts:commonjs", () => !argv().min),
					"ts:esm",
					condition("ts:amd", () => !!argv().production)
			  );
	});

	task("ts", series("ts:compile", "ts:postprocess"));

	task("build", series("clean", "copy", "sass", "ts")).cached();

	task("dev:storybook", series("storybook:start"));
};
