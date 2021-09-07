import { WebPartTitle } from "@dlw-digitalworkplace/dw-spfx-controls";
import { IReadonlyTheme, ThemeChangedEventArgs, ThemeProvider } from "@microsoft/sp-component-base";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "DemoSPFxComponentsWebPartStrings";
import { createTheme } from "office-ui-fabric-react";
import * as React from "react";
import * as ReactDom from "react-dom";
import { IDemoSPFxComponentsWebPartProps } from "./DemoSPFxComponentsWebPart.types";

export default class DemoSPFxComponentsWebPart extends BaseClientSideWebPart<IDemoSPFxComponentsWebPartProps> {
	private _themeProvider: ThemeProvider;
	private _themeVariant: IReadonlyTheme;

	constructor() {
		super();

		this._onThemeChanged = this._onThemeChanged.bind(this);
		this._updateWebPartTitle = this._updateWebPartTitle.bind(this);
	}

	protected async onInit(): Promise<void> {
		this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
		this._themeVariant = this._themeProvider.tryGetTheme();

		this._themeProvider.themeChangedEvent.add(this, this._onThemeChanged);
	}

	public render(): void {
		ReactDom.render(
			<WebPartTitle
				displayMode={this.displayMode}
				hidden={this.properties.hideTitle}
				title={this.properties.title}
				theme={createTheme(this._themeVariant)}
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
		this._themeVariant = args.theme;
		this.render();
	}

	private _updateWebPartTitle(newValue: string): void {
		this.properties.title = newValue;
	}
}
