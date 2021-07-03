export class MemoryStorage implements Storage {
	protected data = new Map<string, any>();

	constructor(initialData?: { [key: string]: any }) {
		if (!!initialData) {
			Object.keys(initialData).forEach((it) => {
				this.data.set(it, initialData[it]);
			});
		}
	}

	get length(): number {
		return this.data.size;
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
}
