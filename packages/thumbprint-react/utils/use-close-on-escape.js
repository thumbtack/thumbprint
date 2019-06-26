import { useEffect } from 'react';

const ESC_KEY = 27;
const EVENT_NAME = 'keyup';

/**
 * React Hook to register a keyboard listener to run a function when the ESC key is pressed.
 *
 * @param {Function} doClose Function to run when ESC key is pressed.
 * @param {Boolean} isActive Whether or not the key listener does anything.
 */
export default function useCloseOnEscape(doClose, isActive = false) {
    useEffect(
        () => {
            const handleKeyUp = event => {
                if (isActive && event.keyCode === ESC_KEY) {
                    event.preventDefault();
                    doClose();
                }
            };

            document.addEventListener(EVENT_NAME, handleKeyUp);

            return () => {
                document.removeEventListener(EVENT_NAME, handleKeyUp);
            };
        },
        [doClose, isActive],
    );
}
