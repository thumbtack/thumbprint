import React from 'react';
import noScroll from 'no-scroll';

export default class NoScroll extends React.Component {
    componentDidMount(): void {
        noScroll.on();
    }

    componentWillUnmount(): void {
        noScroll.off();
    }

    render(): null {
        return null;
    }
}
