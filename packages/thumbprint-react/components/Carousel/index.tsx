import React, { useState, useRef } from 'react';
import Swipeable from 'react-swipeable';
import BaseCarousel from './base-carousel';

interface PropTypes {
    /**
     * The items in the carousel that appear horizontally.
     */
    children: React.ReactNode;
    /**
     * The index of the left-most item to display in the carousel. Supports all numbers.
     */
    selectedIndex: number;
    /**
     * This function is called while a user is dragging the carousel and receives the new index.
     * This should update the `selectedIndex` prop similarly to an `onChange` in a controlled
     * input.
     */
    onSelectedIndexChange: (newIndex: number) => void;
    /**
     * The number of items that are visible at once.
     */
    visibleCount?: number;
    /**
     * The amount space separating each item. Supports CSS values such as `8px` or `0.5em`.
     */
    spacing?: string;
}

export default function Carousel({
    children,
    spacing = '0px',
    visibleCount = 1,
    selectedIndex,
    onSelectedIndexChange,
}: PropTypes): JSX.Element {
    const [dragIndexOffset, setDragIndexOffset] = useState(0);
    const isDragging = dragIndexOffset !== 0;
    const containerRef = useRef<HTMLDivElement>(null);

    function onDrag(deltaX: number): void {
        const size = containerRef.current ? containerRef.current.getBoundingClientRect() : null;

        if (size && size.width) {
            // Set the `dragIndexOffset` so that the carousel can visually move before we send
            // the new index to the parent.
            setDragIndexOffset((deltaX / size.width) * visibleCount);
        }
    }

    function onDragEnd(): void {
        onSelectedIndexChange(selectedIndex + dragIndexOffset);
        setDragIndexOffset(0);
    }

    return (
        <div ref={containerRef}>
            <Swipeable
                preventDefaultTouchmoveEvent
                onSwiping={(_, deltaX): void => onDrag(deltaX)}
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
