import { Customizations, CustomizerContext, ICustomizerContext, ITheme } from "@fluentui/react";
import * as React from "react";

function useForceUpdate() {
	const [, setState] = React.useState<any>();
	return React.useCallback(() => setState({}), []);
}

export function useTheme(scope?: string): ITheme {
	// We need the ability to force a re-render if the global Customizations
	// pushes a change, as it lives outside of the React life-cycle
	const forceUpdate = useForceUpdate();

	// Well actually, we only care about changes to global Customizations
	// if we're not within a local CustomizerContext
	const inCustomizerContext = React.useRef(false);

	React.useEffect(() => {
		if (!inCustomizerContext.current) {
			Customizations.observe(forceUpdate);
		}

		return () => {
			if (!inCustomizerContext.current) {
				Customizations.unobserve(forceUpdate);
			}
		};
	});

	// Check if we are in a local CustomizerContext
	const customizerContext: ICustomizerContext = React.useContext(CustomizerContext);
	inCustomizerContext.current = !!customizerContext.customizations.inCustomizerContext;

	// Customizations.getSettings will get the global theme by default,
	// or get the locally-scoped theme if present
	const customizationSettings = Customizations.getSettings(["theme"], scope || "", customizerContext.customizations);

	return customizationSettings.theme;
}
