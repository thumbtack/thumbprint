import { useState, useEffect } from 'react';
import createFocusTrap from 'focus-trap';

function toggleTrap(trap, isActive) {
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
 * @param {Element} element The element to trap focus inside of
 * @param {boolean} isActive Whether or not to activate the trap
 * @param {Object} focusTrapOptions Options to pass to the focus-trap library.
 *     See: https://github.com/davidtheclark/focus-trap#usage for details.
 */
export default function useFocusTrap(element, isActive, focusTrapOptions) {
    const [trap, setTrap] = useState(null);

    useEffect(
        () => {
            // If we've already created a trap, toggle it based on the isActive status
            if (trap) {
                toggleTrap(trap, isActive);
                // Otherwise, if there's no trap, but there is a valid element that needs to be trapped
            } else if (element) {
                // Create the trap and store a reference to it
                const newTrap = createFocusTrap(element, focusTrapOptions);
                setTrap(newTrap);
                // And toggle it based on isActive status
                toggleTrap(newTrap, isActive);
            }

            // When the component unmounts, we deactivate the trap, if there is one
            return () => {
                if (trap) {
                    trap.deactivate();
                }
            };
        },
        [element, isActive, focusTrapOptions, trap],
    );
}
