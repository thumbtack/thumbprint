import { useEffect } from 'react';
import createFocusTrap from 'focus-trap';

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
    useEffect(
        () => {
            const focusTrap = createFocusTrap(element, focusTrapOptions);

            if (isActive) {
                focusTrap.activate();
            }

            return () => {
                focusTrap.deactivate();
            };
        },
        [element, isActive, focusTrapOptions],
    );
}
