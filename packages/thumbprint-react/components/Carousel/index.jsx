import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import BaseCarousel from './base-carousel.jsx';

export default function Carousel({
    children,
    spacing,
    visibleCount,
    selectedIndex,
    onSelectedIndexChange,
}) {
    const [dragIndexOffset, setDragIndexOffset] = useState(0);
    const isDragging = dragIndexOffset !== 0;
    const containerRef = useRef();

    function onDrag(deltaX) {
        const size = containerRef.current && containerRef.current.getBoundingClientRect();

        // Set the `dragIndexOffset` so that the carousel can visually move before we send
        // the new index to the parent.
        setDragIndexOffset((deltaX / size.width) * visibleCount);
    }

    function onDragEnd() {
        onSelectedIndexChange(selectedIndex + dragIndexOffset);
        setDragIndexOffset(0);
    }

    return (
        <div ref={containerRef}>
            <Swipeable
                preventDefaultTouchmoveEvent
                onSwiping={(_, deltaX) => onDrag(deltaX)}
                onSwiped={onDragEnd}
            >
                <BaseCarousel
                    selectedIndex={selectedIndex + dragIndexOffset}
                    visibleCount={visibleCount}
                    spacing={spacing}
                    animationDuration={isDragging ? 0 : undefined}
                >
                    {children}
                </BaseCarousel>
            </Swipeable>
        </div>
    );
}

Carousel.propTypes = {
    /**
     * The items in the carousel that appear horizontally.
     */
    children: PropTypes.node.isRequired,
    /**
     * The index of the left-most item to display in the carousel. Supports all numbers.
     */
    selectedIndex: PropTypes.number.isRequired,
    /**
     * This function is called while a user is dragging the carousel and receives the new index.
     * This should update the `selectedIndex` prop similarly to an `onChange` in a controlled
     * input.
     */
    onSelectedIndexChange: PropTypes.func.isRequired,
    /**
     * The number of items that are visible at once.
     */
    visibleCount: PropTypes.number,
    /**
     * The amount space separating each item. Supports CSS values such as `8px` or `0.5em`.
     */
    spacing: PropTypes.string,
};

Carousel.defaultProps = {
    visibleCount: 1,
    spacing: '0px',
};
