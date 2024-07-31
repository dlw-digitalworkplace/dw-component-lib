import { Version } from "@microsoft/sp-core-library";
import { ILoadScriptOptions, SPComponentLoader } from "@microsoft/sp-loader";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "DemoTaxonomyPickerWebPartStrings";
import * as React from "react";
import * as ReactDom from "react-dom";
import { IDemoTaxonomyPickerWebPartProps, IWebPartContext, WebPartContext } from "./DemoTaxonomyPickerWebPart.types";
import { DemoTaxonomyPicker } from "./components/DemoTaxonomyPicker";

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
					allowDisabledTerms={this.properties.allowDisabledTerms}
					showDeprecatedTerms={this.properties.showDeprecatedTerms}
					showDisabledTerms={this.properties.showDisabledTerms}
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
									label: strings.AllowDeprecatedTermsLabel
								}),
								PropertyPaneToggle("allowDisabledTerms", {
									label: strings.AllowDisabledTermsLabel
								}),
								PropertyPaneToggle("showDeprecatedTerms", {
									label: strings.ShowDeprecatedTermsLabel
								}),
								PropertyPaneToggle("showDisabledTerms", {
									label: strings.ShowDisabledTermsLabel
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
		const loadScript = (url: string, options?: ILoadScriptOptions): Promise<unknown> => {
			let siteUrl = this.context.pageContext.site.serverRelativeUrl;
			siteUrl = siteUrl.endsWith("/") ? siteUrl.substring(0, siteUrl.length - 1) : siteUrl;

			url = url.startsWith("/") ? url.substring(1) : url;

			return SPComponentLoader.loadScript(`${siteUrl}/${url}`, options);
		};

		await loadScript("/_layouts/15/init.js", { globalExportsName: "$_global_init" });
		await loadScript("/_layouts/15/MicrosoftAjax.js", { globalExportsName: "Sys" });
		await loadScript("/_layouts/15/SP.Runtime.js", { globalExportsName: "SP" });
		await loadScript("/_layouts/15/SP.js", { globalExportsName: "SP" });
		await loadScript("/_layouts/15/SP.Taxonomy.js", { globalExportsName: "SP" });
	}
}
