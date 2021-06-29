import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ITermValue } from "./models";
import { TermPicker } from "./TermPicker";

const items: ITermValue[] = [
	{ key: "bf0b202c-1dde-4088-ae7a-2163189f3d6c", name: "My term A" },
	{ key: "bfa97857-b8af-4cbd-b363-86a05ec669b3", name: "My term B" },
	{ key: "50724d2c-b2fd-4eba-8285-7db8cbf71d43", name: "Another term" }
];

storiesOf("TermPicker", module)
	.addParameters({ component: TermPicker })
	.add("Basic", () => {
		const onResolveSuggestions = (
			filter: string,
			selectedItems?: ITermValue[]
		): ITermValue[] | PromiseLike<ITermValue[]> => {
			return items
				.filter((it) => it.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)
				.filter((it) => !selectedItems?.some((si) => si.key === it.key));
		};

		return <TermPicker onResolveSuggestions={onResolveSuggestions} />;
	});
