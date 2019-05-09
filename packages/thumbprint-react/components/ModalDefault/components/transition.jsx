import React from 'react';
import PropTypes from 'prop-types';

const EXITED = 'exited';
const ENTERING = 'entering';
const ENTERED = 'entered';
const EXITING = 'exiting';

const propTypes = {
    children: PropTypes.func.isRequired,
    in: PropTypes.bool.isRequired,
    timeout: PropTypes.shape({
        enter: PropTypes.number.isRequired,
        exit: PropTypes.number.isRequired,
    }).isRequired,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
};

const defaultProps = {
    onEntered: undefined,
    onExited: undefined,
};

class Transition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stage: null,
        };
    }

    componentDidMount() {
        const { in: inProp } = this.props;

        this.setState({
            stage: inProp ? ENTERING : EXITED,
        });

        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.clearExistingTimeout = this.clearExistingTimeout.bind(this);

        this.currentTimeout = null;

        // Call `onEntered` If the modal is immediately open when it mounts.
        if (inProp) {
            this.onEntered();
        }
    }

    componentDidUpdate(prevProps) {
        const { in: inProp } = this.props;

        if (prevProps.in !== inProp) {
            this.clearExistingTimeout();

            if (inProp) {
                this.onEntering();
            } else {
                this.onExiting();
            }
        }
    }

    componentWillUnmount() {
        this.clearExistingTimeout();
    }

    onEntering() {
        const { timeout } = this.props;

        this.setState({ stage: ENTERING });
        this.currentTimeout = setTimeout(this.onEntered, timeout.enter);
    }

    onEntered() {
        const { onEntered } = this.props;

        this.setState({ stage: ENTERED });

        if (onEntered) {
            onEntered();
        }
    }

    onExiting() {
        const { timeout } = this.props;

        this.setState({ stage: EXITING });
        this.currentTimeout = setTimeout(this.onExited, timeout.exit);
    }

    onExited() {
        const { onExited } = this.props;

        this.setState({ stage: EXITED });

        if (onExited) {
            onExited();
        }
    }

    clearExistingTimeout() {
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
        }
    }

    render() {
        const { stage } = this.state;
        const { children } = this.props;

        if (!stage) {
            return null;
        }

        return children(stage);
    }
}

Transition.propTypes = propTypes;
Transition.defaultProps = defaultProps;

export default Transition;
