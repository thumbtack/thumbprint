import React from 'react';
import ReactDOM from 'react-dom';
import canUseDOM from './can-use-dom';

interface PropTypes {
    /**
     * Whether or not the contents should be displaced to the end of the `<body>`, or rendered inline.
     */
    shouldDisplace?: boolean;
    /**
     * The contents to render.
     */
    children?: React.ReactNode;
}

/**
 * Component to conditionally portal a component to the end of the `<body>` if a certain condition is
 * true. Also automatically guards against trying to use portals in SSR where `document` is not
 * defined.
 */
export default function ConditionalPortal({
    shouldDisplace = false,
    children,
}: PropTypes): JSX.Element | null {
    const [container] = React.useState(() => {
        const el = document.createElement('div');
        el.classList.add('root-portal');
        return el;
    });

    React.useEffect(() => {
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    }, []);

    if (!children) {
        return null;
    }

    return (
        <React.Fragment>
            {canUseDOM && shouldDisplace ? ReactDOM.createPortal(children, container) : children}
        </React.Fragment>
    );
}
