import { RefreshCache } from "../RefreshCache";
import MockStorage from "./MockStorage";

describe("refreshCache", () => {
	beforeEach(() => {
		// clear memory storage
		MockStorage.clear();
	});

	afterEach(() => {
		// clear memory storage
		MockStorage.clear();
	});

	describe("get", () => {
		it("should get an existing item", () => {
			// arrange
			MockStorage.setItem(
				"test",
				JSON.stringify({
					data: "Test value",
					expiresOn: Date.now() + 5 * 60 * 1000 // now + 5 minutes
				})
			);
			const cache = new RefreshCache(MockStorage);

			// act
			const value = cache.get("test");

			// assert
			expect(value).toBe("Test value");
		});

		it("should return undefined when retrieving a non-existing item", () => {
			// arrange
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);

			// act
			const value = cache.get("another");

			// assert
			expect(value).toBeUndefined();
		});

		it("should return undefined when retrieving an expired item", () => {
			// arrange
			MockStorage.setItem(
				"test",
				JSON.stringify({
					data: "Test value",
					expiresOn: Date.now() - 5 * 60 * 1000 // now - 5 minutes
				})
			);
			const cache = new RefreshCache(MockStorage);

			// act
			const value = cache.get("test");

			// assert
			expect(value).toBeUndefined();
		});
	});

	describe("getOrAdd", () => {
		it("should get an existing item", () => {
			// arrange
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);

			// act
			const value = cache.getOrAdd("test", () => "Another value");

			// assert
			expect(value).toBe("Test value");
		});

		it("should add new value when item doesn't exist", () => {
			// arrange
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);

			// act
			const value = cache.getOrAdd("another", () => "Another value");

			// assert
			expect(value).toBe("Another value");
		});

		it("should add a new item with specified TTL when item doesn't exist", () => {
			// arrange
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);
			const expiresOn = Date.now() + 5 * 60 * 1000; // now + 5 minutes

			// act
			const value = cache.getOrAdd("another", () => "Another value", new Date(expiresOn));

			// assert
			expect(value).toBe("Another value");

			expect(MockStorage.data.has("another")).toBe(true);

			const testItem = JSON.parse(MockStorage.data.get("another")!);
			expect(testItem.data).toBe("Another value");
			expect(testItem.expiresOn).toBe(expiresOn);
		});
	});

	describe("getOrAddAsync", () => {
		it("should get an existing item", async () => {
			// arrange
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);

			// act
			const value = await cache.getOrAddAsync("test", () => new Promise((res) => res("Another value")));

			// assert
			expect(value).toBe("Test value");
		});

		it("should add new value when item doesn't exist", async () => {
			// arrange
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);

			// act
			const value = await cache.getOrAddAsync("another", () => new Promise((res) => res("Another value")));

			// assert
			expect(value).toBe("Another value");

			const cacheValue = cache.get("another");
			expect(cacheValue).toBe("Another value");
		});

		it("should add a new item with specified TTL when item doesn't exist", async () => {
			// arrange
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);
			const expiresOn = Date.now() + 5 * 60 * 1000; // now + 5 minutes

			// act
			const value = await cache.getOrAddAsync(
				"another",
				() => new Promise((res) => res("Another value")),
				new Date(expiresOn)
			);

			// assert
			expect(value).toBe("Another value");

			expect(MockStorage.data.has("another")).toBe(true);

			const testItem = JSON.parse(MockStorage.data.get("another")!);
			expect(testItem.data).toBe("Another value");
			expect(testItem.expiresOn).toBe(expiresOn);
		});

		it("should return current item and update cache with new value", async () => {
			// arrange
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);

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
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);
			const expiresOn = Date.now() + 5 * 60 * 1000; // now + 5 minutes

			// act
			const value = await cache.getOrAddAsync(
				"test",
				() => new Promise((res) => res("Another value")),
				new Date(expiresOn),
				true
			);

			// assert
			expect(value).toBe("Test value");

			const updatedValue = cache.get("test");
			expect(updatedValue).toBe("Another value");

			expect(MockStorage.data.has("test")).toBe(true);

			const testItem = JSON.parse(MockStorage.data.get("test")!);
			expect(testItem.data).toBe("Another value");
			expect(testItem.expiresOn).toBe(expiresOn);
		});

		it("should return current and callback with new value", async () => {
			// arrange
			const callback = jest.fn();
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);

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

		it("should only call a single promise when requesting the same non-existing key twice", async () => {
			// arrange
			const valueFunc = jest.fn().mockReturnValue(new Promise((res) => setTimeout(() => res("Test value"), 2500)));
			const valueFunc2 = jest.fn().mockReturnValue(new Promise((res) => setTimeout(() => res("Another value"), 2500)));
			const cache = new RefreshCache(MockStorage);

			// act
			await Promise.all([
				cache.getOrAddAsync("test", () => valueFunc()),
				cache.getOrAddAsync("test", () => valueFunc()),
				cache.getOrAddAsync("test", () => valueFunc2())
			]);

			// assert
			expect(valueFunc).toBeCalledTimes(1);
			expect(valueFunc2).toBeCalledTimes(0);
		});
	});

	describe("set", () => {
		it("should add a new item", () => {
			// arrange
			const cache = new RefreshCache(MockStorage);

			// act
			cache.set("test", { obj: "Test value" });

			// assert
			expect(MockStorage.data.has("test")).toBe(true);

			const testItem = JSON.parse(MockStorage.data.get("test")!);
			expect(testItem.data).toMatchObject({ obj: "Test value" });
		});

		it("should add a new item with specified TTL as Date", () => {
			// arrange
			const cache = new RefreshCache(MockStorage);
			const expiresOn = Date.now() + 5 * 60 * 1000; // now + 5 minutes

			// act
			cache.set("test", { obj: "Test value" }, new Date(expiresOn));

			// assert
			expect(MockStorage.data.has("test")).toBe(true);

			const testItem = JSON.parse(MockStorage.data.get("test")!);
			expect(testItem.data).toMatchObject({ obj: "Test value" });
			expect(testItem.expiresOn).toBe(expiresOn);
		});

		it("should add a new item with specified TTL as number", () => {
			// arrange
			const cache = new RefreshCache(MockStorage);
			const ttl = 5 * 60; // 5 minutes

			const dateBeforeSet = new Date();

			// act
			cache.set("test", { obj: "Test value" }, ttl);

			const dateAfterSet = new Date();

			// assert
			expect(MockStorage.data.has("test")).toBe(true);

			const testItem = JSON.parse(MockStorage.data.get("test")!);
			expect(testItem.data).toMatchObject({ obj: "Test value" });
			expect(testItem.expiresOn).toBeGreaterThanOrEqual(dateBeforeSet.getTime() + ttl * 1000);
			expect(testItem.expiresOn).toBeLessThanOrEqual(dateAfterSet.getTime() + ttl * 1000);
		});

		it("should overwrite an existing item", () => {
			// arrange
			MockStorage.setItem(
				"test",
				JSON.stringify({
					data: "Test value",
					expiresOn: Date.now() + 5 * 60 * 1000
				})
			);
			const cache = new RefreshCache(MockStorage);

			// act
			cache.set("test", "Updated value");

			// assert
			expect(MockStorage.data.size).toBe(1);
			expect(MockStorage.data.has("test")).toBe(true);

			const testItem = JSON.parse(MockStorage.data.get("test")!);
			expect(testItem.data).toBe("Updated value");
		});

		it("should update TTL when overwriting an existing item", () => {
			// arrange
			const initialExpiry = new Date(Date.now() + 5 * 60 * 1000);
			const updatedExpiry = new Date(Date.now() + 15 * 60 * 1000);

			MockStorage.setItem(
				"test",
				JSON.stringify({
					data: "Test value",
					expiresOn: initialExpiry
				})
			);
			const cache = new RefreshCache(MockStorage);

			// act
			cache.set("test", "Updated value", updatedExpiry);

			// assert
			expect(MockStorage.data.size).toBe(1);
			expect(MockStorage.data.has("test")).toBe(true);

			const testItem = JSON.parse(MockStorage.data.get("test")!);
			expect(testItem.data).toBe("Updated value");
			expect(testItem.expiresOn).toBe(updatedExpiry.getTime());
		});
	});

	describe("delete", () => {
		it("should remove a single item", () => {
			MockStorage.setItem("test1", JSON.stringify({ data: "Test value" }));
			MockStorage.setItem("test2", JSON.stringify({ data: "Another value" }));
			const cache = new RefreshCache(MockStorage);

			// act
			cache.delete("test1");

			// assert
			expect(MockStorage.data.has("test1")).toBe(false);
			expect(MockStorage.data.has("test2")).toBe(true);
		});

		it("should not error when removing non-existing item", () => {
			// arrange
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);

			// act
			cache.delete("another");

			// assert
			expect(() => {
				cache.delete("another");
			}).not.toThrow();
		});

		it("should no longer return a removed item", () => {
			// arrange
			MockStorage.setItem("test", JSON.stringify({ data: "Test value" }));
			const cache = new RefreshCache(MockStorage);

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
			MockStorage.setItem("test1", JSON.stringify({ data: "Test value" }));
			MockStorage.setItem("test2", JSON.stringify({ data: "Another value" }));
			const cache = new RefreshCache(MockStorage);

			// act
			cache.clear();

			// assert
			expect(MockStorage.data.has("test1")).toBe(false);
			expect(MockStorage.data.has("test2")).toBe(false);
		});
	});
});
