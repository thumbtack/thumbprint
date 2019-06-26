import { useEffect } from 'react';

const ESC_KEY = 27;
const EVENT_NAME = 'keyup';

export default function useCloseOnEscape(doClose) {
    useEffect(
        () => {
            const handleKeyUp = event => {
                if (event.keyCode === ESC_KEY) {
                    event.preventDefault();
                    doClose();
                }
            };

            document.addEventListener(EVENT_NAME, handleKeyUp);

            return () => {
                document.removeEventListener(EVENT_NAME, handleKeyUp);
            };
        },
        [doClose],
    );
}
