// tslint:disable:no-bitwise

import { GraphPeoplePickerProvider } from "../GraphPeoplePickerProvider";
import { GroupType } from "../models/GroupType";
import { ResourceType } from "../models/ResourceType";

describe("GraphPeoplePickerProvider", () => {
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
