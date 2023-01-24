import { useDrag } from "@dlw-digitalworkplace/dw-react-utils";
import { classNamesFunction } from "@fluentui/react";
import * as React from "react";
import { ISplitPaneProps, ISplitPaneStyleProps, ISplitPaneStyles } from "./SplitPane.types";

const getClassNames = classNamesFunction<ISplitPaneStyleProps, ISplitPaneStyles>();

export const SplitPaneBase: React.FC<ISplitPaneProps> = (props: ISplitPaneProps): JSX.Element => {
	// Props
	const { onRenderLeftPane, onRenderRightPane } = props;
	const { className, styles, initialSizes, minWidthLeftPane, minWidthRightPane, fixed } = props;
	const separatorWidth = 10;

	// States
	const [leftPaneInitialWidth, setLeftPaneInitialWidth] = React.useState<number>();
	const [rightPaneInitialWidth, setRightPaneInitialWidth] = React.useState<number>();

	// Refs
	const leftPane = React.useRef() as React.MutableRefObject<HTMLDivElement>;
	const rightPane = React.useRef() as React.MutableRefObject<HTMLDivElement>;
	const separator = React.useRef() as React.MutableRefObject<HTMLDivElement>;
	React.useEffect(() => {
		// Calculate initial widths
		const separatorWidthPercentage =
			(separatorWidth / (leftPane.current.parentElement?.clientWidth ?? window.innerWidth)) * 100;
		if (!!initialSizes && initialSizes.length === 2) {
			setLeftPaneInitialWidth(initialSizes[0] - separatorWidthPercentage / 2);
			setRightPaneInitialWidth(initialSizes[1] - separatorWidthPercentage / 2);
		}
	}, [initialSizes]);

	// Drag
	const { positionX, isDragging } = useDrag(separator.current, "horizontal", undefined, fixed);
	if (
		!!positionX &&
		!fixed &&
		!!leftPane.current &&
		!!rightPane.current &&
		!!leftPaneInitialWidth &&
		!!rightPaneInitialWidth
	) {
		const slideLeft = positionX < 0;
		const parentWidth = separator.current.parentElement?.clientWidth ?? window.innerWidth;
		const pixelOffset = Math.abs(positionX);
		const percentageOffset = (pixelOffset / parentWidth) * 100;

		const leftPaneNewWidth = slideLeft
			? leftPaneInitialWidth - percentageOffset
			: leftPaneInitialWidth + percentageOffset;

		const rightPaneNewWidth = slideLeft
			? (rightPaneInitialWidth ?? 0) + percentageOffset
			: (rightPaneInitialWidth ?? 0) - percentageOffset;

		if (leftPaneNewWidth >= (minWidthLeftPane ?? 0) && rightPaneNewWidth >= (minWidthRightPane ?? 0)) {
			leftPane.current.style.width = `${leftPaneNewWidth}%`;
			rightPane.current.style.width = `${rightPaneNewWidth}%`;
		}
	}

	// Styles
	const classNames = getClassNames(styles, { className, fixed, isDragging });

	return (
		<div className={classNames.container}>
			<div ref={leftPane} className={classNames.leftPane} style={{ width: `${leftPaneInitialWidth}%` }}>
				{onRenderLeftPane()}
			</div>
			<div ref={separator} className={classNames.separator} style={{ width: `${separatorWidth}px` }}>
				<div className={classNames.separatorLeft} />
				<div className={classNames.separatorRight} />
			</div>
			<div ref={rightPane} className={classNames.rightPane} style={{ width: `${rightPaneInitialWidth}%` }}>
				{onRenderRightPane()}
			</div>
		</div>
	);
};
