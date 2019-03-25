import React from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';

class LazyImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldLoadImage: false,
        };

        this.setShouldLoadImage = this.setShouldLoadImage.bind(this);
    }

    setShouldLoadImage(shouldLoadImage) {
        this.setState({
            shouldLoadImage,
        });
    }

    render() {
        const { children, src, alt } = this.props;
        const { shouldLoadImage } = this.state;

        return (
            <React.Fragment>
                <Waypoint
                    onEnter={() => this.setShouldLoadImage(true)}
                    // Start loading slightly before the user scrolls to the image
                    topOffset={-100}
                    bottomOffset={-100}
                >
                    {children({ src: shouldLoadImage ? src : undefined, alt })}
                </Waypoint>
                {/*
                    Using `noscript` allows Google to index the image.
                    Source: https://youtu.be/PFwUbgvpdaQ?t=2018 (Google I/O 2018)
                */}
                <noscript>
                    <img src={src} alt={alt} />
                </noscript>
            </React.Fragment>
        );
    }
}

LazyImage.propTypes = {
    /**
     * A function that receives an object containing the properties `src` and `alt`. Using a
     * function gives the consumer greater control, allowing this to work with both CSS background
     * images as well as `img` tags.
     */
    children: PropTypes.func.isRequired,
    /**
     * The URL to the image that should be lazy-loaded.
     */
    src: PropTypes.string.isRequired,
    /**
     * Text describing the image.
     */
    alt: PropTypes.string,
};

LazyImage.defaultProps = {
    alt: '',
};

// eslint-disable-next-line import/prefer-default-export
export { LazyImage };
