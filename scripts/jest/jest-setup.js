// @ts-check

// Fail on warnings.
const consoleWarn = console.warn;
const consoleError = console.error;

console.error = customError.bind(null);

function customError(...args) {
	consoleError(...args);

	if (args.length === 1 && typeof args[0] === "object" && args[0].stack) {
		// If the "message" was an exception, re-throw it to get the full stack trace
		throw args[0];
	} else {
		throw new Error(`[console.error] ${args.join(" ")}`);
	}
}
