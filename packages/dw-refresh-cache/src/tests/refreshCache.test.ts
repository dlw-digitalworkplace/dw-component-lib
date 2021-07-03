import { RefreshCache } from "../refreshCache";
import { MockStorage } from "./mockStorage";

describe("refreshCache", () => {
	describe("get", () => {
		it("should get an existing item", () => {
			// arrange
			const storage = new MockStorage({
				test: JSON.stringify({
					data: "Test value",
					expiresOn: Date.now() + 5 * 60 * 1000
				})
			});
			const cache = new RefreshCache(storage);

			// act
			const value = cache.get("test");

			// assert
			expect(value).toBe("Test value");
		});

		it("should return undefined when retrieving a non-existing item", () => {
			// arrange
			const storage = new MockStorage({ test: JSON.stringify({ data: "Test value" }) });
			const cache = new RefreshCache(storage);

			// act
			const value = cache.get("another");

			// assert
			expect(value).toBeUndefined();
		});

		it("should return undefined when retrieving an expired item", () => {
			// arrange
			const storage = new MockStorage({
				test: JSON.stringify({
					data: "Test value",
					expiresOn: Date.now() - 5 * 60 * 1000 // now - 5 minutes
				})
			});
			const cache = new RefreshCache(storage);

			// act
			const value = cache.get("test");

			// assert
			expect(value).toBeUndefined();
		});
	});

	describe("getOrAdd", () => {
		it("should get an existing item", () => {
			// arrange
			const storage = new MockStorage({ test: JSON.stringify({ data: "Test value" }) });
			const cache = new RefreshCache(storage);

			// act
			const value = cache.getOrAdd("test", () => "Another value");

			// assert
			expect(value).toBe("Test value");
		});

		it("should add new value when item doesn't exist", () => {
			// arrange
			const storage = new MockStorage({ test: { data: "Test value" } });
			const cache = new RefreshCache(storage);

			// act
			const value = cache.getOrAdd("another", () => "Another value");

			// assert
			expect(value).toBe("Another value");
		});

		it("should add a new item with specified TTL when item doesn't exist", () => {
			// arrange
			const storage = new MockStorage({ test: JSON.stringify({ data: "Test value" }) });
			const cache = new RefreshCache(storage);
			const ttl = Date.now() + 5 * 60 * 1000; // now + 5 minutes

			// act
			const value = cache.getOrAdd("another", () => "Another value", new Date(ttl));

			// assert
			expect(value).toBe("Another value");

			const storageData = storage.getData();
			expect(storageData.has("another")).toBe(true);

			const testItem = JSON.parse(storageData.get("another")!);
			expect(testItem.data).toBe("Another value");
			expect(testItem.expiresOn).toBe(ttl);
		});
	});

	describe("getOrAddAsync", () => {
		it("should get an existing item", async () => {
			// arrange
			const storage = new MockStorage({ test: JSON.stringify({ data: "Test value" }) });
			const cache = new RefreshCache(storage);

			// act
			const value = await cache.getOrAddAsync("test", () => new Promise((res) => res("Another value")));

			// assert
			expect(value).toBe("Test value");
		});

		it("should add new value when item doesn't exist", async () => {
			// arrange
			const storage = new MockStorage({ test: JSON.stringify({ data: "Test value" }) });
			const cache = new RefreshCache(storage);

			// act
			const value = await cache.getOrAddAsync("another", () => new Promise((res) => res("Another value")));

			// assert
			expect(value).toBe("Another value");

			const cacheValue = cache.get("another");
			expect(cacheValue).toBe("Another value");
		});

		it("should add a new item with specified TTL when item doesn't exist", async () => {
			// arrange
			const storage = new MockStorage({ test: JSON.stringify({ data: "Test value" }) });
			const cache = new RefreshCache(storage);
			const ttl = Date.now() + 5 * 60 * 1000; // now + 5 minutes

			// act
			const value = await cache.getOrAddAsync(
				"another",
				() => new Promise((res) => res("Another value")),
				new Date(ttl)
			);

			// assert
			expect(value).toBe("Another value");

			const storageData = storage.getData();
			expect(storageData.has("another")).toBe(true);

			const testItem = JSON.parse(storageData.get("another")!);
			expect(testItem.data).toBe("Another value");
			expect(testItem.expiresOn).toBe(ttl);
		});

		it("should return current item and update cache with new value", async () => {
			// arrange
			const storage = new MockStorage({ test: JSON.stringify({ data: "Test value" }) });
			const cache = new RefreshCache(storage);

			// act
			const value = await cache.getOrAddAsync(
				"test",
				() => new Promise((res) => res("Another value")),
				undefined,
				true
			);

			// assert
			expect(value).toBe("Test value");

			const updatedValue = cache.get("test");
			expect(updatedValue).toBe("Another value");
		});

		it("should return current item and update cache with new value and specified TTL", async () => {
			// arrange
			const storage = new MockStorage({ test: JSON.stringify({ data: "Test value" }) });
			const cache = new RefreshCache(storage);
			const ttl = Date.now() + 5 * 60 * 1000; // now + 5 minutes

			// act
			const value = await cache.getOrAddAsync(
				"test",
				() => new Promise((res) => res("Another value")),
				new Date(ttl),
				true
			);

			// assert
			expect(value).toBe("Test value");

			const updatedValue = cache.get("test");
			expect(updatedValue).toBe("Another value");

			const storageData = storage.getData();
			expect(storageData.has("test")).toBe(true);

			const testItem = JSON.parse(storageData.get("test")!);
			expect(testItem.data).toBe("Another value");
			expect(testItem.expiresOn).toBe(ttl);
		});

		it("should return current and callback with new value", async () => {
			// arrange
			const callback = jest.fn();
			const storage = new MockStorage({ test: JSON.stringify({ data: "Test value" }) });
			const cache = new RefreshCache(storage);

			// act
			const value = await cache.getOrAddAsync(
				"test",
				() => new Promise((res) => res("Another value")),
				undefined,
				true,
				callback
			);

			// assert
			expect(value).toBe("Test value");
			expect(callback).toBeCalledTimes(1);
			expect(callback).toBeCalledWith("Another value");
		});
	});

	describe("set", () => {
		it("should add a new item", () => {
			// arrange
			const storage = new MockStorage();
			const cache = new RefreshCache(storage);

			// act
			cache.set("test", { obj: "Test value" });

			// assert
			const storageData = storage.getData();
			expect(storageData.has("test")).toBe(true);

			const testItem = JSON.parse(storageData.get("test")!);
			expect(testItem.data).toMatchObject({ obj: "Test value" });
		});

		it("should add a new item with specified TTL as Date", () => {
			// arrange
			const storage = new MockStorage();
			const cache = new RefreshCache(storage);
			const ttl = Date.now() + 5 * 60 * 1000; // now + 5 minutes

			// act
			cache.set("test", { obj: "Test value" }, new Date(ttl));

			// assert
			const storageData = storage.getData();
			expect(storageData.has("test")).toBe(true);

			const testItem = JSON.parse(storageData.get("test")!);
			expect(testItem.data).toMatchObject({ obj: "Test value" });
			expect(testItem.expiresOn).toBe(ttl);
		});

		it("should add a new item with specified TTL as number", () => {
			// arrange
			const storage = new MockStorage();
			const cache = new RefreshCache(storage);
			const ttl = 5 * 60 * 1000; // now + 5 minutes

			const dateBeforeSet = new Date();

			// act
			cache.set("test", { obj: "Test value" }, ttl);

			const dateAfterSet = new Date();

			// assert
			const storageData = storage.getData();
			expect(storageData.has("test")).toBe(true);

			const testItem = JSON.parse(storageData.get("test")!);
			expect(testItem.data).toMatchObject({ obj: "Test value" });
			expect(testItem.expiresOn).toBeGreaterThanOrEqual(dateBeforeSet.getTime() + ttl);
			expect(testItem.expiresOn).toBeLessThanOrEqual(dateAfterSet.getTime() + ttl);
		});

		it("should overwrite an existing item", () => {
			// arrange
			const storage = new MockStorage({
				test: JSON.stringify({
					data: "Test value",
					expiresOn: Date.now() + 5 * 60 * 1000
				})
			});
			const cache = new RefreshCache(storage);

			// act
			cache.set("test", "Updated value");

			// assert
			const storageData = storage.getData();

			expect(storageData.size).toBe(1);
			expect(storageData.has("test")).toBe(true);

			const testItem = JSON.parse(storageData.get("test")!);
			expect(testItem.data).toBe("Updated value");
		});

		it("should update TTL when overwriting an existing item", () => {
			// arrange
			const initialTtl = new Date(Date.now() + 5 * 60 * 1000);
			const updatedTtl = new Date(Date.now() + 15 * 60 * 1000);

			const storage = new MockStorage({
				test: JSON.stringify({
					data: "Test value",
					expiresOn: initialTtl
				})
			});
			const cache = new RefreshCache(storage);

			// act
			cache.set("test", "Updated value", updatedTtl);

			// assert
			const storageData = storage.getData();

			expect(storageData.size).toBe(1);
			expect(storageData.has("test")).toBe(true);

			const testItem = JSON.parse(storageData.get("test")!);
			expect(testItem.data).toBe("Updated value");
			expect(testItem.expiresOn).toBe(updatedTtl.getTime());
		});
	});

	describe("delete", () => {
		it("should remove a single item", () => {
			// arrange
			const storage = new MockStorage({
				test1: JSON.stringify({ data: "Test value" }),
				test2: JSON.stringify({ data: "Another value" })
			});
			const cache = new RefreshCache(storage);

			// act
			cache.delete("test1");

			// assert
			const storageData = storage.getData();
			expect(storageData.has("test1")).toBe(false);
			expect(storageData.has("test2")).toBe(true);
		});

		it("should not error when removing non-existing item", () => {
			// arrange
			const storage = new MockStorage({ test: { data: "Test value" } });
			const cache = new RefreshCache(storage);

			// act
			cache.delete("another");

			// assert
			expect(() => {
				cache.delete("another");
			}).not.toThrow();
		});

		it("should no longer return a removed item", () => {
			// arrange
			const storage = new MockStorage({ test: JSON.stringify({ data: "Test value" }) });
			const cache = new RefreshCache(storage);

			const beforeDelete = cache.get("test");

			// act
			cache.delete("test");

			const afterDelete = cache.get("test");

			// assert
			expect(beforeDelete).toBe("Test value");
			expect(afterDelete).toBeUndefined();
		});
	});

	describe("clear", () => {
		it("should remove all items", () => {
			// arrange
			const storage = new MockStorage({
				test1: JSON.stringify({ data: "Test value" }),
				test2: JSON.stringify({ data: "Another value" })
			});
			const cache = new RefreshCache(storage);

			// act
			cache.clear();

			// assert
			const storageData = storage.getData();
			expect(storageData.has("test1")).toBe(false);
			expect(storageData.has("test2")).toBe(false);
		});
	});
});
