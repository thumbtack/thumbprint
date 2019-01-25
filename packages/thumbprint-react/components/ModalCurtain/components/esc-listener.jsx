import React from 'react';
import PropTypes from 'prop-types';

const ESC_KEY = 27;

export default class EscListener extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        const { onEscPress } = this.props;

        if (event.keyCode === ESC_KEY) {
            event.preventDefault();
            onEscPress(event);
        }
    }

    render() {
        return null;
    }
}

EscListener.propTypes = {
    onEscPress: PropTypes.func.isRequired,
};
