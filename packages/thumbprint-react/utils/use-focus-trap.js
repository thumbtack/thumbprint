import { useEffect } from 'react';
import createFocusTrap from 'focus-trap';

export default function useFocusTrap(element, isActive, focusTrapOptions) {
    useEffect(
        () => {
            if (!element) return () => {};

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
