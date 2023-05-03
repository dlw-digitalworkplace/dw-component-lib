export interface IDemoPeoplePickerWebPartProps {
	itemLimit: number;
	providerType: "GraphProvider" | "MockProvider" | "SharePointProvider";
	endpoint: "users" | "me/people";
}
