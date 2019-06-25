import { useEffect } from 'react';

const ESC_KEY = 27;

export default function useCloseOnEscape(doClose) {
    useEffect(
        () => {
            const handleKeyUp = event => {
                if (event.keyCode === ESC_KEY) {
                    event.preventDefault();
                    doClose();
                }
            };

            document.addEventListener('keyup', handleKeyUp);

            return () => {
                document.removeEventListener('keyup', handleKeyUp);
            };
        },
        [doClose],
    );
}
