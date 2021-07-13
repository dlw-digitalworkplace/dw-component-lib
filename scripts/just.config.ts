import * as fs from "fs";
import { addResolvePath, argv, condition, option, parallel, series, task } from "just-scripts";
import * as path from "path";
import { clean } from "./tasks/clean";
import { jest as jestTask, jestWatch } from "./tasks/jest";
import { ts } from "./tasks/ts";
const { postprocessTask } = require("./tasks/postprocess");
const { postprocessAmdTask } = require("./tasks/postprocess-amd");
const { postprocessCommonjsTask } = require("./tasks/postprocess-commonjs");

/** Do only the bare minimum setup of options and resolve paths */
function basicPreset() {
	// this adds a resolve path for the build tooling deps like TS from the scripts folder
	addResolvePath(__dirname);

	option("production");

	option("webpackConfig", { alias: "w" });

	// Build only commonjs (not other TS variants) but still run other tasks
	option("commonjs");

	option("cached", { default: false } as any);

	option("registry", { default: "https://registry.npmjs.org" } as any);

	option("push", { default: true } as any);

	option("package", { alias: "p" });
}

export function preset() {
	basicPreset();

	task("clean", clean);

	task("jest", jestTask);
	task("jest-watch", jestWatch);

	task(
		"test",
		condition("jest", () => fs.existsSync(path.join(process.cwd(), "jest.config.js")))
	);

	task("ts:postprocess", postprocessTask());
	task("ts:postprocess:amd", postprocessAmdTask);
	task("ts:postprocess:commonjs", postprocessCommonjsTask);

	task("ts:commonjs", series(ts.commonjs));
	task("ts:esm", ts.esm);
	task("ts:amd", series(ts.amd));

	task("ts:compile", () => {
		return argv().commonjs
			? "ts:commonjs-only"
			: parallel(
					condition("ts:commonjs", () => !argv().min),
					"ts:esm",
					condition("ts:amd", () => !!argv().production)
			  );
	});

	task("ts", series("ts:compile"));

	task("build", series("clean", "ts")).cached();
}

preset.basic = basicPreset;

if (process.cwd() === __dirname) {
	// load the preset if this is being run within the scripts package
	preset();
}
