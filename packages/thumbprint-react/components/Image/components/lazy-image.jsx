import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';
import Picture from './picture.jsx';
import canUseDOM from '../../../utils/can-use-dom';

const LazyImage = ({
    children,
    src: srcProp,
    sources: sourcesProp,
    root,
    onEnter,
    alt,
    ...rest
}) => {
    const [shouldLoadImage, setShouldLoadImage] = useState(false);

    // We track this as state because the polyfill is loaded asynchronously in browsers that need
    // it. Storing it in state allows us to trigger a re-render once the polyfill is loaded.
    const [isIntersectionObserverSupported, setIsIntersectionObserverSupported] = useState(
        canUseDOM && typeof window.IntersectionObserver !== 'undefined',
    );

    // Loads the polyfill and indicates the browser now supports Intersection Observer.
    if (canUseDOM && !isIntersectionObserverSupported) {
        import('intersection-observer').then(() => {
            if (typeof window.IntersectionObserver !== 'undefined') {
                setIsIntersectionObserverSupported(true);
            }
        });
    }

    const src = shouldLoadImage ? srcProp : undefined;
    const sources = shouldLoadImage ? sourcesProp : [];

    return (
        <>
            {isIntersectionObserverSupported && (
                <InView
                    threshold={0}
                    root={root}
                    rootMargin="100px"
                    onChange={inView => {
                        if (inView) {
                            setShouldLoadImage(true);
                            onEnter(true);
                        }
                    }}
                >
                    {({ ref }) => children({ src, sources, alt, ref, ...rest })}
                </InView>
            )}

            {srcProp && (
                <noscript>
                    <Picture src={srcProp} sources={sourcesProp} alt={alt} />
                </noscript>
            )}
        </>
    );
};

export default LazyImage;
