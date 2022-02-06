import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "DemoPeoplePickerWebPartStrings";
import * as React from "react";
import * as ReactDom from "react-dom";
import { DemoPeoplePicker } from "./components/DemoPeoplePicker";
import { IDemoPeoplePickerWebPartProps } from "./DemoPeoplePickerWebPart.types";

export default class DemoPeoplePickerWebPart extends BaseClientSideWebPart<IDemoPeoplePickerWebPartProps> {
	protected async onInit(): Promise<void> {}

	public render(): void {
		ReactDom.render(<DemoPeoplePicker />, this.domElement);
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
							groupFields: []
						}
					]
				}
			]
		};
	}
}
