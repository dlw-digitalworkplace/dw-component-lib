import { MemoryStorage } from "../memoryStorage";

export class MockStorage extends MemoryStorage {
	public getData(): Map<string, string | null> {
		return this.data;
	}
}
