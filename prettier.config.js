// https://prettier.io/docs/en/configuration.html
module.exports = {
	printWidth: 120,
	singleQuote: false,
	trailingComma: "none",
	useTabs: true,
	overrides: [
		{
			files: "**/*.yml",
			options: {
				useTabs: false
			}
		}
	]
};
