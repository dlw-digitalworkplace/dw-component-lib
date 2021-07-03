import { ICacheObject } from "./models";

export class RefreshCache {
	private DEFAULT_EXPIRATION: number = 24 * 60 * 60 * 1000; // 1 day

	constructor(private storage: Storage) {}

	/**
	 * Retrieves item from the cache. If the item doesn't exist, calculate it and add it to the cache for future use.
	 *
	 * @param key - Key of the cache entry
	 * @param valueFunc - Function to retrieve the value if no cached entry exists
	 * @param timeToLive - Time to live until expiring
	 */
	public getOrAdd<T>(key: string, valueFunc: () => T, timeToLive?: number | Date): T {
		// retrieve cache item
		const cacheData: T | undefined = this.get(key);

		if (!!cacheData) {
			// if data exists, return it
			return cacheData;
		}

		// calculate the new data and add it to the cache
		const data = valueFunc();
		this.set(key, data, timeToLive);

		// return the result
		return data;
	}

	/**
	 * Retrieves item from the cache. If the item doesn't exist, calculate it and add it to the cache for future use.
	 *
	 * @param key - Key of the cache entry
	 * @param valueFunc - Function to retrieve the value if no cached entry exists
	 * @param timeToLive - Time to live until expiring
	 * @param updateCache - Indicates if the cache entry should be updated after returning the current value
	 * @param updateCallback - Callback for when the new value has been calculated
	 */
	public async getOrAddAsync<T>(
		key: string,
		valueFunc: () => Promise<T>,
		timeToLive?: number | Date,
		updateCache?: boolean,
		updateCallback?: (data: T) => void
	): Promise<T> {
		// retrieve cache item
		const cacheData: T | undefined = this.get(key);

		if (!cacheData) {
			// if no data present, calculate the new data and add it to the cache
			const data = await valueFunc();
			this.set(key, data, timeToLive);

			// return the data
			return data;
		}

		if (updateCache) {
			// if cache should be updated asynchronously, start an async function
			(async () => {
				// calculate the new data and add it to the cache
				const data = await valueFunc();
				this.set(key, data, timeToLive);

				if (!!updateCallback) {
					// send callback with the new data
					updateCallback(data);
				}
			})();
		}

		// return cached data
		return cacheData;
	}

	/**
	 * Retrieves item from the cache.
	 *
	 * @param key - Key of the cache entry
	 */
	public get<T>(key: string): T | undefined {
		// retrieve item from storage
		const storageItem = this.storage.getItem(key);

		if (!storageItem) {
			// if item is falsey, return undefined
			return undefined;
		}

		// parse the data
		const cacheItem = JSON.parse(storageItem) as ICacheObject;

		if (cacheItem.expiresOn && cacheItem.expiresOn < Date.now()) {
			// if item is expired, return undefined
			return undefined;
		}

		// return item's data
		return cacheItem.data;
	}

	/**
	 * Adds or replaces an item in the cache
	 *
	 * @param key - Key of the cache entry
	 * @param value - Value for the cache entry
	 * @param timeToLive - Time to live until expiring
	 */
	public set<T>(key: string, value: T, timeToLive?: number | Date): void {
		// set the expiration date to either:
		// - the passed Date
		// - current Date + passed number or default number of ticks
		const expiresOn =
			typeof timeToLive === "number"
				? Date.now() + timeToLive
				: timeToLive
				? timeToLive.getTime()
				: Date.now() + this.DEFAULT_EXPIRATION;

		// create a cache object
		const cacheItem: ICacheObject = {
			data: value,
			expiresOn: expiresOn
		};

		// add or update item in storage
		this.storage.setItem(key, JSON.stringify(cacheItem));
	}

	/**
	 * Checks if the key exists in the cache.
	 *
	 * @param key - Key of the cache entry
	 */
	public has(key: string): boolean {
		// retrieve item from storage
		const cacheItem = this.storage.getItem(key);

		// return if item exists
		return !!cacheItem;
	}

	/**
	 * Removes an entry from the cache.
	 *
	 * @param key - Key of the cache entry
	 */
	public delete(key: string): void {
		// remove item from storage
		this.storage.removeItem(key);
	}

	/**
	 * Removes all entries from the cache.
	 */
	public clear(): void {
		// clear storage
		this.storage.clear();
	}
}
