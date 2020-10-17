/** Jest test setup file. */

const { initializeIcons } = require("@uifabric/icons");

// Initialize icons.
initializeIcons("");

global.requestAnimationFrame = (callback) => {
	setTimeout(callback, 0);
};
