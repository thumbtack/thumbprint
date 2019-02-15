import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';

class LazyImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            src: props.placeholder,
        };

        this.setSrc = this.setSrc.bind(this);
    }

    setSrc(src) {
        this.setState({
            src,
        });
    }

    render() {
        const { children, src: srcProp, alt } = this.props;
        const { src } = this.state;

        return (
            <>
                <Waypoint onEnter={() => this.setSrc(srcProp)}>{children({ src, alt })}</Waypoint>
                {/* SEO friendliness: https://youtu.be/PFwUbgvpdaQ?t=2018 */}
                <noscript>
                    <img src={src} alt={alt} />
                </noscript>
            </>
        );
    }
}

LazyImage.propTypes = {
    children: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

LazyImage.defaultProps = {
    placeholder: undefined,
};

// eslint-disable-next-line import/prefer-default-export
export { LazyImage };
