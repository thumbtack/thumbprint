import React from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import BaseCarousel from './base-carousel.jsx';

class Carousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dragIndexOffset: 0,
        };

        this.onDrag = this.onDrag.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);

        this.containerRef = React.createRef();
    }

    onDrag(deltaX) {
        const size = this.containerRef.current && this.containerRef.current.getBoundingClientRect();

        const { visibleCount } = this.props;

        // Set the `dragIndexOffset` so that the carousel can visually move before we send
        // the new index to the parent.
        const dragIndexOffset = (deltaX / size.width) * visibleCount;

        this.setState({
            dragIndexOffset,
        });
    }

    onDragEnd() {
        const { selectedIndex, onSelectedIndexChange } = this.props;
        const { dragIndexOffset } = this.state;

        const newSelectedIndex = selectedIndex + dragIndexOffset;

        onSelectedIndexChange(newSelectedIndex);

        this.setState({
            dragIndexOffset: 0,
        });
    }

    render() {
        const { children, spacing, visibleCount, selectedIndex } = this.props;
        const { dragIndexOffset } = this.state;

        const isDragging = dragIndexOffset !== 0;

        return (
            <div ref={this.containerRef}>
                <Swipeable
                    preventDefaultTouchmoveEvent
                    onSwiping={(_, deltaX) => {
                        this.onDrag(deltaX);
                    }}
                    onSwiped={this.onDragEnd}
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

export default Carousel;
