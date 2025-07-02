import { SharePointTaxonomyProvider } from "./SharePointTaxonomyProvider";

// Mock SP.Taxonomy.Term class
class MockTerm {
	constructor(
		private id: string,
		private name: string,
		private parentId: string | null,
		private isDeprecated: boolean = false,
		private isAvailableForTagging: boolean = true
	) {}

	get_id() {
		return { toString: () => this.id };
	}

	get_name() {
		return this.name;
	}

	get_parent() {
		return {
			get_serverObjectIsNull: () => this.parentId === null,
			get_id: () => ({ toString: () => this.parentId })
		};
	}

	get_isDeprecated() {
		return this.isDeprecated;
	}

	get_isAvailableForTagging() {
		return this.isAvailableForTagging;
	}
}

describe("SharePointTaxonomyProvider", () => {
	let provider: SharePointTaxonomyProvider;

	beforeEach(() => {
		provider = new SharePointTaxonomyProvider("https://dummy.sharepoint.com", "TestTermSet", 1033);
		// Mark as initialized to bypass the initialization check
		(provider as any).isInitialized = true;
	});

	describe("getTermTree with unavailable parent terms", () => {
		it("should handle children with unavailable parents gracefully", async () => {
			// Mock cached terms: parent not available for tagging, child is available
			const mockTerms = [
				new MockTerm("parent1", "Parent Term", null, false, false), // Not available for tagging
				new MockTerm("child1", "Child Term", "parent1", false, true)  // Available for tagging
			];

			(provider as any).cachedTerms = mockTerms;
			(provider as any)._spTermToTerm = (term: MockTerm) => ({
				key: term.get_id().toString(),
				name: term.get_name()
			});

			// This should not throw an error
			const result = await provider.getTermTree({ trimUnavailable: true });

			// Since the parent is filtered out, the child becomes orphaned and should not appear in result
			expect(result).toEqual([]);
		});

		it("should include terms when parent is available for tagging", async () => {
			// Mock cached terms: both parent and child available for tagging
			const mockTerms = [
				new MockTerm("parent1", "Parent Term", null, false, true), // Available for tagging
				new MockTerm("child1", "Child Term", "parent1", false, true)  // Available for tagging
			];

			(provider as any).cachedTerms = mockTerms;
			(provider as any)._spTermToTerm = (term: MockTerm) => ({
				key: term.get_id().toString(),
				name: term.get_name()
			});

			const result = await provider.getTermTree({ trimUnavailable: true });

			// Both terms should be included, with proper parent-child relationship
			expect(result).toHaveLength(1);
			expect(result[0].key).toBe("parent1");
			expect(result[0].name).toBe("Parent Term");
			expect(result[0].children).toHaveLength(1);
			expect(result[0].children![0].key).toBe("child1");
			expect(result[0].children![0].name).toBe("Child Term");
		});

		it("should not filter when trimUnavailable is false", async () => {
			// Mock cached terms: parent not available for tagging, child is available
			const mockTerms = [
				new MockTerm("parent1", "Parent Term", null, false, false), // Not available for tagging
				new MockTerm("child1", "Child Term", "parent1", false, true)  // Available for tagging
			];

			(provider as any).cachedTerms = mockTerms;
			(provider as any)._spTermToTerm = (term: MockTerm) => ({
				key: term.get_id().toString(),
				name: term.get_name()
			});

			const result = await provider.getTermTree({ trimUnavailable: false });

			// Both terms should be included when not filtering unavailable terms
			expect(result).toHaveLength(1);
			expect(result[0].key).toBe("parent1");
			expect(result[0].children).toHaveLength(1);
			expect(result[0].children![0].key).toBe("child1");
		});
	});
});