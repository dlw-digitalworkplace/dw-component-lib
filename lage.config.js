module.exports = {
	pipeline: {
		build: ["^build"],
		clean: [],
		lint: [],
		test: ["build"],
		start: ["build"]
	}
};
