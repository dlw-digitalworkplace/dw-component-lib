import { Story } from "@storybook/react";
import * as React from "react";
import { ISplitPaneProps, ISplitPaneStyleProps, ISplitPaneStyles } from "../SplitPane.types";
import { SplitPane } from "../SplitPane";
import { Toggle } from "office-ui-fabric-react";

const defaultArgTypes = {
	onRenderLeftPane: { control: "none" },
	onRenderRigthPane: { control: "none" },
};
const defaultArgs: Partial<ISplitPaneProps> = {
	initialSizes: [30, 70]
};
const loremIpsum: string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const paneStyle = { padding: "5px" };


export const Basic: Story<ISplitPaneProps> = ({ ...args }) => {
	const onRenderPane = () => {
		return <div style={paneStyle}>{loremIpsum}</div>;
	}
	return (
		<div style={{ position: "relative" }}>
			<SplitPane
				{...args}
				onRenderLeftPane={onRenderPane}
				onRenderRightPane={onRenderPane}
			/>
		</div>
	);
};
Basic.argTypes = { ...defaultArgTypes };
Basic.args = { ...defaultArgs };
Basic.parameters = { docs: { source: { type: "code" } } };

export const MinWidth: Story<ISplitPaneProps> = () => {
	const onRenderPane = () => {
		return <div style={paneStyle}>{loremIpsum}</div>;
	}
	return (
		<div style={{ position: "relative" }}>
			<SplitPane
				initialSizes={[70, 30]}
				minWidthLeftPane={25}
				minWidthRightPane={25}
				onRenderLeftPane={onRenderPane}
				onRenderRightPane={onRenderPane}
			/>
		</div>
	);
};
MinWidth.argTypes = { ...defaultArgTypes };
MinWidth.args = { ...defaultArgs };
MinWidth.parameters = { docs: { source: { type: "code" } } };


export const Fixed: Story<ISplitPaneProps> = ({ ...args }) => {
	const [isFixed, setIsFixed] = React.useState(false);
	const onRenderPane = () => {
		return <div style={paneStyle}>{loremIpsum}</div>;
	}
	const onToggleChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean | undefined): void => {
		setIsFixed(checked ?? false)
	};
	return (
		<div>
			<Toggle label={"Fixed?"} onChange={onToggleChange} checked={isFixed} />
			<div style={{ position: "relative" }}>
				<SplitPane
					{...args}
					fixed={isFixed}
					onRenderLeftPane={onRenderPane}
					onRenderRightPane={onRenderPane}
				/>
			</div>
		</div>
	);
};
Fixed.argTypes = { ...defaultArgTypes };
Fixed.args = { ...defaultArgs };
Fixed.parameters = { docs: { source: { type: "code" } } };


export const CustomStyles: Story<ISplitPaneProps> = () => {
	const onRenderPane = () => {
		return <div style={paneStyle}>{loremIpsum}</div>;
	}

	const splitPaneStyles = (props: ISplitPaneStyleProps): ISplitPaneStyles => {
		const { isDragging } = props;
		return {
			separatorLeft: [
				{
					borderRight: "solid 2px #c42828"
				},
				isDragging && {
					background: "#c42828"
				}
			],
			rightPane: {
				backgroundColor: "#f3f3f3",
				borderRadius: "10px"
			}
		}
	}

	return (
		<div style={{ position: "relative" }}>
			<SplitPane
				initialSizes={[70, 30]}
				className="custom-class"
				styles={splitPaneStyles}
				onRenderLeftPane={onRenderPane}
				onRenderRightPane={onRenderPane}
			/>
		</div>
	);
};
CustomStyles.argTypes = { ...defaultArgTypes };
CustomStyles.args = { ...defaultArgs };
CustomStyles.parameters = { docs: { source: { type: "code" } } };




