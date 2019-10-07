import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import rotate from 'rotate-array';
import range from 'lodash/range';
import styles from './base-carousel.module.scss';

interface PropTypes {
    /**
     * The items in the carousel that appear horizontally.
     */
    children: React.ReactNode;
    /**
     * The index of the left-most item to display in the carousel. Supports all numbers.
     */
    selectedIndex?: number;
    /**
     * The duration of the animation (in milliseconds).
     */
    animationDuration?: number;
    /**
     * The number of items that are visible at once.
     */
    visibleCount?: number;
    /**
     * The amount space separating each item. Supports CSS values such as `8px` or `0.5em`.
     */
    spacing?: string;
}

export default function BaseCarousel({
    children,
    selectedIndex = 0,
    animationDuration = 400,
    visibleCount = 1,
    spacing = '0px',
}: PropTypes): JSX.Element {
    // When animating, `prevSelectedIndex` is the value of `selectedIndex` before the
    // animation began. Once the animation is complete, it becomes the same as `selectedIndex`.
    const [prevSelectedIndex, setPrevSelectedIndex] = useState(selectedIndex);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSuspensed, setIsSuspensed] = useState(false);

    function reorder(items: number[]): number[] {
        // The `prevSelectedIndex` doesn't update until the animation is done, so we want to
        // use that ordering until the animation is complete.
        return rotate<number>(items, -1 * Math.floor(prevSelectedIndex));
    }

    useEffect(() => {
        if (selectedIndex !== prevSelectedIndex) {
            setIsAnimating(true);
            setIsSuspensed(false);

            setTimeout(() => {
                setIsAnimating(false);
                setIsSuspensed(true);
                setPrevSelectedIndex(selectedIndex);

                // We suspend the CSS animation property for a very brief window before
                // re-enabling. This gap allows the component to re-render the new list
                // without the items "sliding" back into place. Once the new items are set up,
                // we re-enable the animation property ready for the next transition.
                setTimeout(() => {
                    setIsSuspensed(false);
                }, 50);
            }, animationDuration);
        }
    }, [animationDuration, prevSelectedIndex, selectedIndex]);

    const itemWidth = 1 / visibleCount;

    // If `selectedIndex` is `1.5`, this value is `0.5`. This is used when the consumer wants
    // to partially display children.
    const fractionalIndexOffset = Math.abs(prevSelectedIndex - Math.floor(prevSelectedIndex));

    // The `adjustedIndex`, when animating, is the number of items to slide. If the value is
    // negative it means that we should slide to the left. It gets reset to `0` when the
    // animation is complete.
    const adjustedIndex = selectedIndex - prevSelectedIndex;

    // This is equal to `fractionalIndexOffset` in the resting state but changes while the
    // transition is occuring.
    const translateX = itemWidth * (adjustedIndex + fractionalIndexOffset) * -100;

    const numChildren = React.Children.count(children);

    // An array of the flex order of the items.
    const childOrders = reorder(range(numChildren));

    // Sometimes we need to duplicate the children so that the carousel can display properly.
    // This is especially needed when animating. Imagine that a 4-item card with 3 visible
    // items wants to animate 2 items to the right. Normally, this would require 5 items to
    // animate without displaying an empty spot. Since there are only 4 items, we temporarily
    // duplicate the `children` until the animation is complete.
    const shouldRenderDuplicateChildren = isAnimating;

    return (
        <div className={styles.root}>
            <ul
                className={styles.wrapper}
                style={{
                    transform: `translateX(${translateX}%)`,
                    transition: isSuspensed ? 'none' : `transform ${animationDuration}ms ease`,
                    width: `calc(100% + ${spacing})`,
                }}
            >
                {React.Children.map(children, (child, i) => (
                    <li
                        key={i}
                        className={styles.item}
                        style={{
                            width: `${itemWidth * 100}%`,
                            paddingRight: spacing,
                            order: childOrders[i],
                        }}
                    >
                        {child}
                    </li>
                ))}

                {/* Temporary elements that appear to the left. */}
                {shouldRenderDuplicateChildren &&
                    React.Children.map(children, (child, index) => (
                        <li
                            key={numChildren + index}
                            className={styles.item}
                            style={{
                                width: `${itemWidth * 100}%`,
                                paddingRight: spacing,
                                order: childOrders[index] + numChildren,
                                transform: `translateX(${numChildren * -200}%)`,
                            }}
                        >
                            {child}
                        </li>
                    ))}

                {/* Temporary elements that appear to the right. */}
                {shouldRenderDuplicateChildren &&
                    React.Children.map(children, (child, index) => (
                        <li
                            key={numChildren + index * 2}
                            className={styles.item}
                            style={{
                                width: `${itemWidth * 100}%`,
                                paddingRight: spacing,
                                order: (childOrders[index] + numChildren) * 2,
                                transform: `translateX(${numChildren * -100}%)`,
                            }}
                        >
                            {child}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
