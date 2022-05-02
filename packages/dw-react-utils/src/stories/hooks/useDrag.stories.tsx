import { Story } from "@storybook/react";
import * as React from "react";
import { useDrag } from "../../hooks";


const dragItemStyles: React.CSSProperties = {
	width: "50px",
	height: "50px",
	backgroundColor: "#a19f9d",
	display: "flex",
	alignItems: "center",
	flexDirection: "row",
	justifyContent: "center",
	color: "white",
	cursor: "move",
	userSelect: "none",
	position: "relative",
	borderRadius: "50%",
	boxShadow: "5px 5px 24px 0px rgba(0,0,0,0.50)"
}

export const Basic: Story = () => {
	const dragRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
	const [dragElement, setDragElement] = React.useState<HTMLElement>();
	const { isDragging, positionX, positionY } = useDrag(dragElement);

	React.useEffect(() => {
		setDragElement(dragRef.current);
	}, []);

	return (
		<div>
			<div>
				<div>Is dragging: {`${isDragging ? "Yes" : "No"}`}</div>
				<div>Position (x, y): {`${positionX}, ${positionY}`}</div>
			</div>
			<div ref={dragRef} style={dragItemStyles}>
				Drag
			</div>
		</div>
	)
}

export const Horizontal: Story = () => {
	const dragRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
	const [dragElement, setDragElement] = React.useState<HTMLElement>();
	const { isDragging, positionX, positionY } = useDrag(dragElement, "horizontal");

	React.useEffect(() => {
		setDragElement(dragRef.current);
	}, []);

	return (
		<div>
			<div>
				<div>Is dragging: {`${isDragging ? "Yes" : "No"}`}</div>
				<div>Position (x, y): {`${positionX}, ${positionY}`}</div>
			</div>
			<div ref={dragRef} style={dragItemStyles}>
				Drag
			</div>
		</div>
	)
}

export const Disable: Story = () => {
	const dragRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
	const [dragElement, setDragElement] = React.useState<HTMLElement>();
	const [disabled, setIsDisabled] = React.useState(false);
	const { isDragging, positionX, positionY } = useDrag(dragElement, "horizontal", undefined, disabled);

	const onChange = (e: React.FormEvent<HTMLInputElement>) => {
		setIsDisabled(e.currentTarget.checked);
	}

	React.useEffect(() => {
		setDragElement(dragRef.current);
	}, []);

	return (
		<div>
			<input id="disableCheckbox" type="checkbox" onChange={onChange} />
			<label htmlFor="disableCheckbox">Disable drag</label>
			<div>
				<div>Is dragging: {`${isDragging ? "Yes" : "No"}`}</div>
				<div>Position (x, y): {`${positionX}, ${positionY}`}</div>
			</div>
			<div ref={dragRef} style={dragItemStyles}>
				Drag
			</div>
		</div>
	)
}

export const EndCallback: Story = () => {
	const onDragEnd = (posX: number, posY: number): void => {
		alert(`Ended drag on: (${posX},${posY})`);
	}

	const dragRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;
	const [dragElement, setDragElement] = React.useState<HTMLElement>();
	const { isDragging, positionX, positionY } = useDrag(dragElement, undefined, onDragEnd);

	React.useEffect(() => {
		setDragElement(dragRef.current);
	}, []);

	return (
		<div>
			<div>
				<div>Is dragging: {`${isDragging ? "Yes" : "No"}`}</div>
				<div>Position (x, y): {`${positionX}, ${positionY}`}</div>
			</div>
			<div ref={dragRef} style={dragItemStyles}>
				Drag
			</div>
		</div>
	)
}
