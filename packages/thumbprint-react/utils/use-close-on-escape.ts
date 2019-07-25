import { useEffect } from 'react';

const ESC_KEY = 27;
const EVENT_NAME = 'keyup';

/**
 * React Hook to register a keyboard listener to run a function when the ESC key is pressed.
 *
 * @param {Function} doClose Function to run when ESC key is pressed.
 * @param {Boolean} isActive Whether or not the key listener does anything.
 */
export default function useCloseOnEscape(doClose: () => void, isActive: boolean = false): void {
    useEffect(
        (): (() => void) => {
            const handleKeyUp = (event: KeyboardEvent): void => {
                if (isActive && event.keyCode === ESC_KEY) {
                    event.preventDefault();
                    doClose();
                }
            };

            document.addEventListener(EVENT_NAME, handleKeyUp);

            return (): void => {
                document.removeEventListener(EVENT_NAME, handleKeyUp);
            };
        },
        [doClose, isActive],
    );
}
