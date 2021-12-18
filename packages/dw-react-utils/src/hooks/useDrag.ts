import * as React from "react";
import { useWindowEvent } from "..";

/**
 * @public
 *
 * The useDrag hook can be used to make HTML elements draggable.
 * Important: The target must be in a non static position (e.g. relative)
 *
 * @param element The HTML element you want to target
 * @param direction The direction of the drag. Default is both directions
 * @param onDragEnd Callback that is fired when the drag movement stops
 * @returns isDragging - Boolean indicating if the dragging is ongoing
 * @returns positionX - The current X position of the drag
 * @returns positionY - The current Y position of the drag
 */
export const useDrag = (
  element: HTMLElement | undefined,
  direction?: "vertical" | "horizontal",
	onDragEnd?:(positionX: number, positionY: number) => void
): {
	isDragging: boolean,
	positionX: number,
	positionY: number
} => {
  const startXPosition = React.useRef<number>(0);
  const startYPosition = React.useRef<number>(0);

  const [positionX, setPositionX] = React.useState<number>(0);
  const [positionY, setPositionY] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  useWindowEvent("mousemove", (event: Event) => {
    const e = event as MouseEvent;
    if (isDragging) {
      if (direction !== "horizontal") {
        const y = e.pageY - startYPosition.current;
        setPositionY(y);
        if (element) { element.style.top = `${y}px`; }
      }
      if (direction !== "vertical") {
        const x = e.pageX - startXPosition.current;
        setPositionX(x);
        if (element) { element.style.left = `${x}px`; }
      }
    }
  });

  useWindowEvent("mouseup", () => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd && onDragEnd(positionX, positionY);
    }
  });

  React.useEffect(() => {
    if (!!element) {
      element.addEventListener("mousedown", (e: MouseEvent) => {
        if (e.currentTarget instanceof HTMLElement) {
          setIsDragging(true);
          const left = element.style.left ? parseInt(element.style.left, 0) : 0;
          const top = element.style.top ? parseInt(element.style.top, 0) : 0;
          startXPosition.current = e.pageX - left;
          startYPosition.current = e.pageY - top;
        }
        else {
          throw new Error("Your target must be an html element");
        }
      });
    }
  }, [element]);

  return {
    isDragging,
    positionX,
    positionY
  };
};
