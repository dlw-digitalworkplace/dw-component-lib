import { IPeoplePickerProvider, MockPeoplePickerProvider } from "@dlw-digitalworkplace/dw-react-controls";
import {
	GraphPeoplePickerProvider,
	IGraphPeoplePickerProviderOptions,
	ResourceType
} from "@dlw-digitalworkplace/peoplepickerprovider-graph";
import {
	ISharePointPeoplePickerProviderOptions,
	PrincipalType,
	SharePointPeoplePickerProvider
} from "@dlw-digitalworkplace/peoplepickerprovider-sharepoint";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneChoiceGroup, PropertyPaneDropdown, PropertyPaneSlider } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "DemoPeoplePickerWebPartStrings";
import * as React from "react";
import * as ReactDom from "react-dom";
import { DemoPeoplePicker } from "./components/DemoPeoplePicker";
import { IDemoPeoplePickerWebPartProps } from "./DemoPeoplePickerWebPart.types";

export default class DemoPeoplePickerWebPart extends BaseClientSideWebPart<IDemoPeoplePickerWebPartProps> {
	private _provider: IPeoplePickerProvider;

	constructor() {
		super();

		this._initializeProvider = this._initializeProvider.bind(this);
	}

	protected async onInit(): Promise<void> {
		await this._initializeProvider();
	}

	public render(): void {
		ReactDom.render(
			<DemoPeoplePicker itemLimit={this.properties.itemLimit} provider={this._provider} />,
			this.domElement
		);
	}

	public async onPropertyPaneFieldChanged(propertyPath: string): Promise<void> {
		// tslint:disable-next-line:no-unused-expression
		if (propertyPath === "providerType") {
			await this._initializeProvider();
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneChoiceGroup("providerType", {
									options: [
										{
											key: "MockProvider",
											text: "Mock provider",
											iconProps: {
												officeFabricIconFontName: "CloudAdd"
											},
											checked: this.properties.providerType === "MockProvider"
										},
										{
											key: "GraphProvider",
											text: "Graph provider",
											iconProps: {
												officeFabricIconFontName: "AzureLogo"
											},
											checked: this.properties.providerType === "GraphProvider"
										},
										{
											key: "SharePointProvider",
											text: "SharePoint provider",
											iconProps: {
												officeFabricIconFontName: "SharepointLogo"
											},
											checked: this.properties.providerType === "SharePointProvider"
										}
									]
								}),
								PropertyPaneSlider("itemLimit", {
									label: "Max. items",
									min: 1,
									max: 10
								}),
								PropertyPaneDropdown("usersEndpoint", {
									label: "Which endpoint to use to retrieve users",
									options: [
										{
											key: "users",
											text: "users"
										},
										{
											key: "me/people",
											text: "me/people"
										}
									],
									selectedKey: this.properties.usersEndpoint,
									disabled: this.properties.providerType !== "GraphProvider"
								})
							]
						}
					]
				}
			]
		};
	}

	private async _initializeProvider(): Promise<void> {
		this._provider = undefined;

		switch (this.properties.providerType) {
			case "GraphProvider": {
				const aadTokenProvider = await this.context.aadTokenProviderFactory.getTokenProvider();
				const providerOptions: IGraphPeoplePickerProviderOptions = {
					resourceTypes: ResourceType.User | ResourceType.Group,
					usersEndpoint: this.properties.usersEndpoint
				};

				this._provider = new GraphPeoplePickerProvider(
					() => aadTokenProvider.getToken("https://graph.microsoft.com"),
					providerOptions
				);
				break;
			}

			case "MockProvider": {
				this._provider = new MockPeoplePickerProvider();
				break;
			}

			case "SharePointProvider": {
				const aadTokenProvider = await this.context.aadTokenProviderFactory.getTokenProvider();
				const providerOptions: ISharePointPeoplePickerProviderOptions = {
					principalTypes:
						PrincipalType.User |
						PrincipalType.DistributionList |
						PrincipalType.SecurityGroup |
						PrincipalType.SharePointGroup
				};

				this._provider = new SharePointPeoplePickerProvider(
					this.context.pageContext.site.absoluteUrl,
					this.context.spHttpClient,
					providerOptions
				).withSearchMoreCapability(() => aadTokenProvider.getToken("https://graph.microsoft.com"));
				break;
			}
		}

		this.render();
	}
}
