/**
 * Setup
 * This is the bootstrap code that is run before any tests, utils, mocks.
 */

/* eslint-disable no-console */

if (process.env.TF_BUILD) {
	jest.spyOn(console, "log");
	jest.spyOn(console, "info");
	jest.spyOn(console, "warn");
	jest.spyOn(console, "error");

	afterAll(() => {
		expect(console.log).not.toHaveBeenCalled();
		expect(console.info).not.toHaveBeenCalled();
		expect(console.warn).not.toHaveBeenCalled();
		expect(console.error).not.toHaveBeenCalled();
	});
}
