/**
 * @jest-environment node
 */

// This file contains SSR specific tests. jest-environment can currently only be configured at the
// file level, not the test level, so we have to perform this in a different file. Here we set
// the environment to node so that code that checks of the presence of `window` to conditonally
// render things in SSR sees what it expects.

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Tooltip from './index';

describe('Tooltip', () => {
    describe('Server rendering', () => {
        test('does not render tooltip when rendered on the server', () => {
            const component = (
                <Tooltip text="Goose">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
                        <button
                            ref={ref}
                            onMouseEnter={onMouseEnter}
                            onClick={onClick}
                            onFocus={onFocus}
                            onMouseLeave={onMouseLeave}
                            onBlur={onBlur}
                            aria-label={ariaLabel}
                            type="button"
                        >
                            Duck
                        </button>
                    )}
                </Tooltip>
            );

            const ssrHTML = ReactDOMServer.renderToStaticMarkup(component);
            expect(ssrHTML).not.toContain('data-test-id="tooltip"');
        });
    });
});
