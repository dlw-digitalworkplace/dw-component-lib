import { Version } from "@microsoft/sp-core-library";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "DemoTaxonomyPickerWebPartStrings";
import * as React from "react";
import * as ReactDom from "react-dom";
import { DemoTaxonomyPicker } from "./components/DemoTaxonomyPicker";
import { IDemoTaxonomyPickerWebPartProps, IWebPartContext, WebPartContext } from "./DemoTaxonomyPickerWebPart.types";

export default class DemoTaxonomyPickerWebPart extends BaseClientSideWebPart<IDemoTaxonomyPickerWebPartProps> {
	protected async onInit(): Promise<void> {
		await this._loadSPDependencies();
	}

	public render(): void {
		const webPartContext: IWebPartContext = {
			siteUrl: this.context.pageContext.site.serverRelativeUrl
		};

		ReactDom.render(
			<WebPartContext.Provider value={webPartContext}>
				<DemoTaxonomyPicker
					allowAddingTerms={this.properties.allowAddingTerms}
					allowDeprecatedTerms={this.properties.allowDeprecatedTerms}
					preCacheTerms={this.properties.preCacheTerms}
					termSetIdOrName={this.properties.termSetIdOrName}
				/>
			</WebPartContext.Provider>,
			this.domElement
		);
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
								PropertyPaneTextField("termSetIdOrName", {
									label: strings.TermSetIdOrNameFieldLabel
								}),
								PropertyPaneToggle("allowAddingTerms", {
									label: strings.AllowAddingTermsFieldLabel
								}),
								PropertyPaneToggle("allowDeprecatedTerms", {
									label: strings.AllowDeprecatedTerms
								}),
								PropertyPaneToggle("preCacheTerms", {
									label: strings.PreCacheTermsFieldLabel
								})
							]
						}
					]
				}
			]
		};
	}

	private async _loadSPDependencies(): Promise<void> {
		const siteUrl = this.context.pageContext.site.serverRelativeUrl;

		await SPComponentLoader.loadScript(`${siteUrl}/_layouts/15/init.js`, { globalExportsName: "$_global_init" });
		await SPComponentLoader.loadScript(`${siteUrl}/_layouts/15/MicrosoftAjax.js`, { globalExportsName: "Sys" });
		await SPComponentLoader.loadScript(`${siteUrl}/_layouts/15/SP.Runtime.js`, { globalExportsName: "SP" });
		await SPComponentLoader.loadScript(`${siteUrl}/_layouts/15/SP.js`, { globalExportsName: "SP" });
		await SPComponentLoader.loadScript(`${siteUrl}/_layouts/15/SP.Taxonomy.js`, { globalExportsName: "SP" });
	}
}
