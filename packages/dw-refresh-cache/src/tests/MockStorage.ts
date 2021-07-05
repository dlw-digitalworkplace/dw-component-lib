import MemoryStorage from "../MemoryStorage";

export class MockStorage implements Storage {
	private static _instance: MockStorage;

	public get length(): number {
		return MemoryStorage.length;
	}

	public clear(): void {
		MemoryStorage.clear();
	}

	public getItem(key: string): string | null {
		return MemoryStorage.getItem(key);
	}

	public key(index: number): string | null {
		return MemoryStorage.key(index);
	}

	public removeItem(key: string): void {
		return MemoryStorage.removeItem(key);
	}

	public setItem(key: string, value: string): void {
		return MemoryStorage.setItem(key, value);
	}

	public get data(): Map<string, any> {
		const currentItems = new Map<string, string | null>();

		MemoryStorage.keys.forEach((it) => {
			currentItems.set(it, MemoryStorage.getItem(it));
		});

		return currentItems;
	}

	private constructor() {}

	static get instance(): MockStorage {
		if (!this._instance) {
			this._instance = new MockStorage();
		}

		return this._instance;
	}
}

export default MockStorage.instance;
