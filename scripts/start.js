// @ts-check

const { spawnSync } = require("child_process");
const prompts = require("prompts");
const getAllPackageInfo = require("./monorepo/getAllPackageInfo");

const allPackages = getAllPackageInfo();
const extraArgs = process.argv.slice(2);

const defaults = [];
const initProjectName = extraArgs.length > 0 && !extraArgs[0].startsWith("-") ? extraArgs.shift() : null;

const projectsWithStartCommand = Object.entries(allPackages)
	.reduce((acc, [pkg, info]) => {
		if (info.packageJson.scripts?.start) {
			acc.push({ title: pkg, value: { pkg, isWorkspace: true, command: "start" } });
		}

		if (info.packageJson.scripts?.["start:profile"]) {
			acc.push({ title: `${pkg} (profile)`, value: { pkg, isWorkspace: true, command: "start:profile" } });
		}

		return acc;
	}, [])
	.filter((n) => n && !defaults.includes(n.title))
	.sort((a, b) => (a.title === b.title ? 0 : a.title > b.title ? 1 : -1));

const suggest = (input, choices) => Promise.resolve(choices.filter((i) => i.title.includes(input)));

(async () => {
	let project;
	const projectChoices = [
		{
			title: "@dlw-digitalworkplace/dw-component-lib",
			value: {
				pkg: "@dlw-digitalworkplace/dw-component-lib",
				isWorkspace: false,
				command: "storybook"
			}
		},
		...defaults.map((p) => ({ title: p, value: { pkg: p, isWorkspace: true, command: "start" } })),
		...projectsWithStartCommand
	];

	if (!initProjectName) {
		const response = await prompts({
			type: "autocomplete",
			name: "project",

			message: "Which project to start (select or type partial name)?",
			suggest,
			choices: projectChoices
		});

		project = response.project;
	} else {
		const matchingProject = projectChoices.filter((it) => it.title === initProjectName)[0];

		if (!!matchingProject) {
			project = matchingProject.value;
		} else {
			throw new Error(
				`Project ${initProjectName} does not exist in the repository, or doesn't support the start command.`
			);
		}
	}

	const spawnArgs = project.isWorkspace ? ["workspace", project.pkg] : [];
	spawnArgs.push(...[project.command, ...(extraArgs.length > 0 ? [extraArgs] : [])]);

	spawnSync("yarn", spawnArgs, {
		shell: true,
		stdio: "inherit"
	});
})();
