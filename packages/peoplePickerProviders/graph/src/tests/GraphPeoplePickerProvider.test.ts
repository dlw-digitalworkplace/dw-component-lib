// tslint:disable:no-bitwise

import { GraphPeoplePickerProvider } from "../GraphPeoplePickerProvider";
import { GroupType } from "../models/GroupType";
import { ResourceType } from "../models/ResourceType";

describe("GraphPeoplePickerProvider", () => {
	describe("Filtering", () => {
		it.each`
			groupType                                                       | expected
			${GroupType.M365}                                               | ${"(groupTypes/any(g: g eq 'Unified'))"}
			${GroupType.Security}                                           | ${"(not(groupTypes/any(g: g eq 'Unified')) AND securityEnabled eq true)"}
			${GroupType.Distribution}                                       | ${"(not(groupTypes/any(g: g eq 'Unified')) AND mailEnabled eq true AND securityEnabled eq false)"}
			${GroupType.M365 | GroupType.Security}                          | ${"(groupTypes/any(g: g eq 'Unified')) OR (not(groupTypes/any(g: g eq 'Unified')) AND securityEnabled eq true)"}
			${GroupType.M365 | GroupType.Distribution}                      | ${"(groupTypes/any(g: g eq 'Unified')) OR (not(groupTypes/any(g: g eq 'Unified')) AND mailEnabled eq true AND securityEnabled eq false)"}
			${GroupType.Security | GroupType.Distribution}                  | ${"(not(groupTypes/any(g: g eq 'Unified')) AND securityEnabled eq true) OR (not(groupTypes/any(g: g eq 'Unified')) AND mailEnabled eq true AND securityEnabled eq false)"}
			${GroupType.M365 | GroupType.Security | GroupType.Distribution} | ${""}
		`(
			"should build correct filter string when groupType is $groupType",
			({ groupType, expected }: { groupType: GroupType; expected: string }) => {
				// arrange
				const provider = new GraphPeoplePickerProvider("__fake__token__", {
					resourceTypes: ResourceType.Group,
					groupTypes: groupType
				});

				const getGroupFilterStringMethod: (
					idsToIgnore?: string[]
				) => string = (GraphPeoplePickerProvider.prototype as any)._getGroupFilterString;

				// act
				const result = getGroupFilterStringMethod.call(provider);

				// assert
				expect(result).toBe(expected);
			}
		);

		it.each`
			groupType                                                       | expected
			${GroupType.M365}                                               | ${'((groupTypes/any(g: g eq \'Unified\'))) AND not(id in ("56914a62-b6f7-4e6f-b534-190fb3e7c8d3","ad461212-4843-410a-b382-fc2a5b809f4e"))'}
			${GroupType.M365 | GroupType.Security | GroupType.Distribution} | ${'not(id in ("56914a62-b6f7-4e6f-b534-190fb3e7c8d3","ad461212-4843-410a-b382-fc2a5b809f4e"))'}
		`(
			"should build correct filter string when passing idsToIgnore and groupType is $groupType",
			({ groupType, expected }: { groupType: GroupType; expected: string }) => {
				// arrange
				const provider = new GraphPeoplePickerProvider("__fake__token__", {
					resourceTypes: ResourceType.Group,
					groupTypes: groupType
				});
				const idsToIgnore = ["56914a62-b6f7-4e6f-b534-190fb3e7c8d3", "ad461212-4843-410a-b382-fc2a5b809f4e"];

				const getGroupFilterStringMethod: (
					idsToIgnore?: string[]
				) => string = (GraphPeoplePickerProvider.prototype as any)._getGroupFilterString;

				// act
				const result = getGroupFilterStringMethod.call(provider, idsToIgnore);

				// assert
				expect(result).toBe(expected);
			}
		);
	});

	describe("Authentication", () => {
		const setupFetchMock = () =>
			Promise.resolve<Response>({
				ok: true,
				json: () => Promise.resolve({ value: [] })
			} as Response);

		beforeEach(() => {
			global.fetch = jest.fn().mockImplementation(setupFetchMock);
		});

		it("should send a fixed Authentication token with the request", async () => {
			// arrange
			const provider = new GraphPeoplePickerProvider("__fake__token__", {
				resourceTypes: ResourceType.User
			});
			const fetchMock = jest.spyOn(global, "fetch");

			// act
			await provider.findUserOrGroup("test");

			// assert
			expect(fetchMock).toBeCalledWith(
				expect.any(String),
				expect.objectContaining({ headers: expect.objectContaining({ Authorization: "Bearer __fake__token__" }) })
			);
		});

		it("should send a dynamic Authentication token with the request", async () => {
			// arrange
			const provider = new GraphPeoplePickerProvider(async () => Promise.resolve("__dynamic__token__"), {
				resourceTypes: ResourceType.User
			});
			const fetchMock = jest.spyOn(global, "fetch");

			// act
			await provider.findUserOrGroup("test");

			// assert
			expect(fetchMock).toBeCalledWith(
				expect.any(String),
				expect.objectContaining({ headers: expect.objectContaining({ Authorization: "Bearer __dynamic__token__" }) })
			);
		});
	});
});
