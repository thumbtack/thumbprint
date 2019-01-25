import React from 'react';
import noScroll from 'no-scroll';

export default class NoScroll extends React.Component {
    componentDidMount() {
        noScroll.on();
    }

    componentWillUnmount() {
        noScroll.off();
    }

    render() {
        return null;
    }
}
