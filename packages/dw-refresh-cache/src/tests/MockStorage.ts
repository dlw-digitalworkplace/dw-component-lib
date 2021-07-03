import { MemoryStorage } from "../MemoryStorage";

export class MockStorage extends MemoryStorage {
	public getData(): Map<string, string | null> {
		return this.data;
	}
}
