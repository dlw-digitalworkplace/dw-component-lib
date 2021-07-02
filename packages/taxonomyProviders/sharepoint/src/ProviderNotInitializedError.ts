export class ProviderNotInitializedError extends Error {
	constructor() {
		super("The provider was not initialized. Please call the initialize() method prior to using the provider.");

		this.name = "ProviderNotInitializedError";
	}
}
