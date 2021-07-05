class MemoryStorage implements Storage {
	private static _instance: MemoryStorage;

	protected data = new Map<string, any>();

	get length(): number {
		return this.data.size;
	}

	get keys(): string[] {
		const result: string[] = [];

		this.data.forEach((_, key) => result.push(key));

		return result;
	}

	public clear(): void {
		this.data.clear();
	}

	public getItem(key: string): string | null {
		return this.data.get(key) || null;
	}

	public key(index: number): string | null {
		if (index >= this.length) {
			return null;
		}

		const iterator = this.data.keys();

		let i = 0;
		let result: string | null = null;
		do {
			result = iterator.next().value;
		} while (++i < index);

		return result;
	}

	public removeItem(key: string): void {
		this.data.delete(key);
	}

	public setItem(key: string, value: string): void {
		this.data.set(key, value);
	}

	private constructor() {}

	static get instance(): MemoryStorage {
		if (!this._instance) {
			this._instance = new MemoryStorage();
		}

		return this._instance;
	}
}

export default MemoryStorage.instance;
