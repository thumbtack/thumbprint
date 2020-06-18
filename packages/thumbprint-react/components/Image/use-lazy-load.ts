import { useRef, useState, useEffect } from 'react';
import forEach from 'lodash/forEach';
import scrollparent from './get-scroll-parent';

function getIntersectionObserverRoot(target: Element): Element | null {
    const parent = scrollparent(target);
    return parent && (parent.tagName === 'HTML' || parent.tagName === 'BODY') ? null : parent;
}

export default function useLazyLoad(
    el: Element | null,
    browserSupportIntersectionObserver: boolean,
): boolean {
    // The total number of Intersection Observers that we end up creating. We create one for each
    // scrollable parent element of `el`. An image within a carousel, for example, could have two
    // scrollable parents: the carousel and the `<body>` element. We'd load the image if it is
    // visible within the carousel and the carousel is visible within the body.
    const [numObservers, setNumObservers] = useState<number>(0);
    // The number of Intersection Observers we've created that have intersected.
    const [numHaveIntersected, setNumHaveIntersected] = useState<number>(0);
    // We store the Intersection Observer instances so that we can clean them up in the `useEffect`
    // return function.
    const observers = useRef<IntersectionObserver[]>([]);

    useEffect(() => {
        if (el && browserSupportIntersectionObserver) {
            // Get array of targets and roots to use with Intersection Observer. `target` is the
            // child element and `root` is the scrollable parent. This terminology comes from the
            // Insersection Observer itself:
            // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
            const observersToCreate: { target: Element; root: Element | null }[] = [];

            // The first target is always the element passed in.
            let target = el;
            let root = getIntersectionObserverRoot(target);

            observersToCreate.push({ target, root });

            // If `root !== null`, that means that there is another scrollable parent. Continue
            // traversing up the DOM tree until we get to the top.
            while (root !== null) {
                target = root;
                root = getIntersectionObserverRoot(target);
                observersToCreate.push({ target, root });
            }

            // We later use the total number of observers to determine if they are all visible.
            setNumObservers(observersToCreate.length);

            // Take the array of targets and roots and create a bunch of Intersection Observers.
            observers.current = observersToCreate.map(p => {
                // We disable this line since we polyfill `IntersectionObserver`.
                // eslint-disable-next-line compat/compat
                const observer = new IntersectionObserver(
                    entries => {
                        // We can assume it's the first one since we only observe one target per
                        // IntersectionObserver.
                        const entry = entries[0];

                        // We use `intersectionRatio` rather than `isIntersecting` because Edge 15
                        // doesn't support `isIntersecting`.
                        if (entry.intersectionRatio > 0) {
                            // We need to pass in a function to `setNumHaveIntersected` so that it
                            // can get the current value of `numHaveIntersected` within this
                            // callback.
                            setNumHaveIntersected(n => n + 1);
                            // We turn off the observer once it has intersected. This is a purposely
                            // naïve approach even though it introduces a small bug: images within
                            // an auto-advancing carousel that once were `isIntersecting`
                            // within the carousel but been auto-advanced out of view will get
                            // loaded once the user scrolls and the carousel intersects the
                            // `<body>`. To fix this, we'd have to increment and decrement
                            // `observer.current`'s and then turn them all off once the image should
                            // be loaded. This would add lot of complexity for an uncommon case so
                            // we leave it as is.
                            observer.unobserve(entry.target);
                        }
                    },
                    {
                        root: p.root,
                        rootMargin: '100px',
                    },
                );

                observer.observe(p.target);

                return observer;
            });
        }

        return function cleanObservers(): void {
            forEach(observers.current, o => o.disconnect());
        };
    }, [el, browserSupportIntersectionObserver]);

    // The image should load if there's at least one Intersection Observer set up and all of them
    // have intersected. The `> 0` check prevents the hook from returning true while before it has
    // even initialized.
    return numObservers > 0 && numObservers === numHaveIntersected;
}
