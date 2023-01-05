/** Jest test setup file. */
const { initializeIcons } = require("@fluentui/react");

// Initialize icons.
initializeIcons("");

global.requestAnimationFrame = (callback) => {
	setTimeout(callback, 0);
};

const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
	const excludes = ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"];
	console.warn = (msg) => {
		excludes.reduce((current, item) => current && msg.indexOf(item) === -1, true) && originalWarn(msg);
	};
});

afterAll(() => {
	console.warn = originalWarn;
});
