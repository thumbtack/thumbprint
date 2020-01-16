import React from 'react';

const EXITED = 'exited';
const ENTERING = 'entering';
const ENTERED = 'entered';
const EXITING = 'exiting';

type Stage = 'exited' | 'entering' | 'entered' | 'exiting' | null;

interface PropTypes {
    children: (stage: Stage) => JSX.Element;
    in: boolean;
    timeout: {
        enter: number;
        exit: number;
    };
    onEntered?: () => void;
    onExited?: () => void;
}

interface StateTypes {
    stage: Stage;
}

export default class Transition extends React.Component<PropTypes, StateTypes> {
    currentTimeout: number | null = null;

    constructor(props: PropTypes) {
        super(props);

        this.state = {
            stage: null,
        };
    }

    componentDidMount(): void {
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

    componentDidUpdate(prevProps: { in: boolean }): void {
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

    componentWillUnmount(): void {
        this.clearExistingTimeout();
    }

    onEntering(): void {
        const { timeout } = this.props;

        this.setState({ stage: ENTERING });
        this.currentTimeout = window.setTimeout(this.onEntered, timeout.enter);
    }

    onEntered(): void {
        const { onEntered } = this.props;

        this.setState({ stage: ENTERED });

        if (onEntered) {
            onEntered();
        }
    }

    onExiting(): void {
        const { timeout } = this.props;

        this.setState({ stage: EXITING });
        this.currentTimeout = window.setTimeout(this.onExited, timeout.exit);
    }

    onExited(): void {
        const { onExited } = this.props;

        this.setState({ stage: EXITED });

        if (onExited) {
            onExited();
        }
    }

    clearExistingTimeout(): void {
        if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
        }
    }

    render(): JSX.Element | null {
        const { stage } = this.state;
        const { children } = this.props;

        if (!stage) {
            return null;
        }

        return children(stage);
    }
}
