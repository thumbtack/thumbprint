import React from 'react';
import styles from './sticky-footer.module.scss';

interface PropTypes {
    children: React.ReactNode;
    setSticky: (isSticky: boolean) => void;
}

/**
 * This component exists because `this.props.setSticky` updates state and React doesn't allow state
 * updates within `render`. The parent component (ModalFooter) receives `setSticky` within render
 * (with the Context API), so it's not possible to access the function within its lifecycle hooks.
 * https://blog.kentcdodds.com/answers-to-common-questions-about-render-props-a9f84bb12d5d#6a05
 */
export default class StickyFooter extends React.Component<PropTypes> {
    componentDidMount(): void {
        const { setSticky } = this.props;
        setSticky(true);
    }

    render(): JSX.Element {
        const { children } = this.props;

        return <div className={styles.root}>{children}</div>;
    }
}
