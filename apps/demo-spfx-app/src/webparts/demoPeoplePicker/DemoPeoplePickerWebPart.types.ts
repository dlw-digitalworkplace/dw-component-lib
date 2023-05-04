export interface IDemoPeoplePickerWebPartProps {
	itemLimit: number;
	providerType: "GraphProvider" | "MockProvider" | "SharePointProvider";
	usersEndpoint: "users" | "me/people";
}
