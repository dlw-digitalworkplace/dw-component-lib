import * as React from "react";

/**
 * @public
 *
 * Helper hook to register events on the window.
 * The event will be correctly registered and unregistered as well.
 *
 * @param type The type of window event
 * @param callback The callback function to execute when the event is triggered
 */

export const useWindowEvent = (type: keyof WindowEventMap, callback: (ev: Event) => void): void => {
  React.useEffect(() => {
    window.addEventListener(type, callback);
    return () => window.removeEventListener(type, callback);
  }, [type, callback]);
};
