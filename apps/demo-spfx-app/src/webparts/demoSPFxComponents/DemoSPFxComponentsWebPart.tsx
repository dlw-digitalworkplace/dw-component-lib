import { WebPartTitle } from "@dlw-digitalworkplace/dw-spfx-controls";
import { ThemeChangedEventArgs, ThemeProvider } from "@microsoft/sp-component-base";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "DemoSPFxComponentsWebPartStrings";
import { createTheme, ITheme } from "office-ui-fabric-react/lib/Styling";
import * as React from "react";
import * as ReactDom from "react-dom";
import { IDemoSPFxComponentsWebPartProps } from "./DemoSPFxComponentsWebPart.types";

export default class DemoSPFxComponentsWebPart extends BaseClientSideWebPart<IDemoSPFxComponentsWebPartProps> {
	private _themeProvider: ThemeProvider;
	private _themeVariant: ITheme;

	constructor() {
		super();

		this._onThemeChanged = this._onThemeChanged.bind(this);
		this._updateWebPartTitle = this._updateWebPartTitle.bind(this);
	}

	protected async onInit(): Promise<void> {
		this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
		this._themeVariant = createTheme(this._themeProvider.tryGetTheme());

		this._themeProvider.themeChangedEvent.add(this, this._onThemeChanged);
	}

	public render(): void {
		ReactDom.render(
			<WebPartTitle
				displayMode={this.displayMode}
				hidden={this.properties.hideTitle}
				title={this.properties.title}
				theme={this._themeVariant as any} /** ITheme doens't resolve correctly for some reason */
				onRenderMoreInfoLink={this.properties.showMoreInfoLink && (() => <a href={""}>All items</a>)}
				onUpdate={this._updateWebPartTitle}
			/>,
			this.domElement
		);
	}

	protected onDispose(): void {
		if (this._themeProvider) {
			this._themeProvider.themeChangedEvent.remove(this, this._onThemeChanged);
		}

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
								PropertyPaneToggle("hideTitle", {
									label: strings.HideTitlePropertyLabel
								}),
								PropertyPaneToggle("showMoreInfoLink", {
									label: strings.ShowMoreInfoLinkPropertyLabel
								})
							]
						}
					]
				}
			]
		};
	}

	private _onThemeChanged(args: ThemeChangedEventArgs): void {
		this._themeVariant = createTheme(this._themeProvider.tryGetTheme());
		this.render();
	}

	private _updateWebPartTitle(newValue: string): void {
		this.properties.title = newValue;
	}
}
