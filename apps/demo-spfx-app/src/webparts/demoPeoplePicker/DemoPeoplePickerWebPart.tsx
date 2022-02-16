import { IPeoplePickerProvider, MockPeoplePickerProvider } from "@dlw-digitalworkplace/dw-react-controls";
import {
	GraphPeoplePickerProvider,
	IGraphPeoplePickerProviderOptions,
	ResourceType
} from "@dlw-digitalworkplace/peoplepickerprovider-graph";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneChoiceGroup } from "@microsoft/sp-property-pane";
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
		ReactDom.render(<DemoPeoplePicker provider={this._provider} />, this.domElement);
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
										}
									]
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
		this.render();

		switch (this.properties.providerType) {
			case "GraphProvider": {
				const aadTokenProvider = await this.context.aadTokenProviderFactory.getTokenProvider();
				const providerOptions: IGraphPeoplePickerProviderOptions = {
					resourceTypes: ResourceType.User | ResourceType.Group
				};

				this._provider = new GraphPeoplePickerProvider(
					() => aadTokenProvider.getToken("https://graph.microsoft.com"),
					providerOptions
				);
				this.render();
				break;
			}

			case "MockProvider": {
				this._provider = new MockPeoplePickerProvider();
				this.render();
				break;
			}
		}
	}
}
