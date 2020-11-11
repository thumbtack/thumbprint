import { useState, useEffect } from 'react';
import createFocusTrap, { FocusTrap } from 'focus-trap';

function toggleTrap(trap: FocusTrap, isActive: boolean): void {
    if (isActive) {
        trap.activate();
    } else {
        trap.deactivate();
    }
}

/**
 * React Hook for trapping the focus inside a particular DOM element. Useful for building modal
 * components.
 *
 * @param element  The element to trap focus inside of
 * @param isActive Whether or not to activate the trap
 * @param initialFocus The initial element inside the trap to focus
 */
export default function useFocusTrap(
    element: HTMLElement | null,
    isActive = false,
    initialFocus: HTMLElement | null,
): void {
    const [trap, setTrap] = useState<FocusTrap>();

    // If `initialFocus` is not provided, `element` becomes the initial focus.
    const initialFocusElement = initialFocus || element;

    useEffect((): (() => void) => {
        // If we've already created a trap, toggle it based on the isActive status
        if (trap) {
            toggleTrap(trap, isActive);
            // Otherwise, if there's no trap, but there is a valid element that needs to be trapped
        } else if (element && initialFocusElement && isActive) {
            // Create the trap and store a reference to it
            const newTrap = createFocusTrap(element, {
                clickOutsideDeactivates: true,
                // Set initial focus to the modal wrapper itself instead of focusing on the first
                // focusable element by default
                initialFocus: initialFocusElement,
            });
            setTrap(newTrap);
            // And toggle it based on isActive status
            toggleTrap(newTrap, isActive);
        }

        // When the component unmounts, we deactivate the trap, if there is one
        return (): void => {
            if (trap) {
                trap.deactivate();
            }
        };
    }, [element, isActive, trap, initialFocusElement]);
}
