import React from 'react';
import displace from 'react-displace';
import ModalStructure from './subcomponents/modal-structure/index.jsx';

const DisplacedModalStructure = displace(ModalStructure);

/**
 * We need to make sure we don't mount the DisplacedModalStructure (which uses portals) before
 * componentDidMount because it'll cause warnings (and actual bugs) with server-side rendering.
 * Pattern taken from react docs and solutions to issues:
 * https://reactjs.org/docs/react-dom.html#hydrate
 * https://github.com/facebook/react/issues/11169
 */
export default class ModalBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isClient: false };
    }

    componentDidMount() {
        this.setState({ isClient: true });
    }

    render() {
        const { isClient } = this.state;

        if (!isClient) return null;

        return <DisplacedModalStructure {...this.props} />;
    }
}
