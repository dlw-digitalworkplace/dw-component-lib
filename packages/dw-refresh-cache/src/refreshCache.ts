import { ICacheObject } from "./models";

export class RefreshCache {
	private DEFAULT_EXPIRATION: number = 10 * 60 * 1000;

	constructor(private storage: Storage) {}

	public getOrAdd<T>(key: string, valueFunc: () => T, timeToLive?: number | Date): T {
		const cacheData: T | undefined = this.get(key);

		if (!cacheData) {
			const data = valueFunc();
			this.set(key, data);

			return data;
		}

		return cacheData;
	}

	public async getOrAddAsync<T>(
		key: string,
		valueFunc: () => Promise<T>,
		timeToLive?: number | Date,
		updateCache?: boolean,
		updateCallback?: (data: T) => void
	): Promise<T> {
		const cacheData: T | undefined = this.get(key);

		if (!cacheData) {
			const data = await valueFunc();
			this.set(key, data);

			return data;
		}

		if (updateCache) {
			(async () => {
				const data = await valueFunc();
				this.set(key, data);

				if (!!updateCallback) {
					updateCallback(data);
				}
			})();
		}

		return cacheData;
	}

	public get<T>(key: string): T | undefined {
		const storageItem = this.storage.getItem(key);

		if (!storageItem) {
			return undefined;
		}

		const cacheItem = JSON.parse(storageItem) as ICacheObject;

		if (cacheItem.expiresOn && cacheItem.expiresOn < Date.now()) {
			return undefined;
		}

		return cacheItem.data;
	}

	public set<T>(key: string, value: T, timeToLive?: number | Date): void {
		const expiresOn =
			typeof timeToLive === "number"
				? Date.now() + timeToLive
				: timeToLive
				? timeToLive.getTime()
				: Date.now() + this.DEFAULT_EXPIRATION;

		const cacheItem: ICacheObject = {
			data: value,
			expiresOn: expiresOn
		};

		this.storage.setItem(key, JSON.stringify(cacheItem));
	}

	public has(key: string): boolean {
		const cacheItem = this.storage.getItem(key);

		return !!cacheItem;
	}

	public delete(key: string): void {
		this.storage.removeItem(key);
	}

	public clear(): void {
		this.storage.clear();
	}
}
