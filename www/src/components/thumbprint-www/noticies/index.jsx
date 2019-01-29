import React from 'react';
import { ThemedLink, Title, Text } from '@thumbtack/thumbprint-react';
import styles from './index.module.scss';

const Notices = () => (
    <div>
        <div className="mb5 bb b-gray-300 pb5">
            <div className={styles.readingWidth}>
                <Title size={4} className="mb2">
                    Looking to contribute?
                </Title>
                <Text className="black-300 mb4">
                    A design system only works when there’s input from a wider team. We encourage
                    contributions both big and small from designers and developers.
                </Text>
                <ThemedLink theme="primary" to="/overview/contributing/">
                    Contributing page
                </ThemedLink>
            </div>
        </div>
        <div>
            <div className={styles.readingWidth}>
                <Title size={4} className="mb2">
                    We’re hiring!
                </Title>
                <Text className="black-300 mb4">
                    We’re solving the industry’s most interesting problems with its brightest
                    talent, at a scale where everyone still feels like family.
                </Text>
                <ThemedLink theme="primary" to="https://thumbtack.com/careers/">
                    View open listings
                </ThemedLink>
            </div>
        </div>
    </div>
);

export default Notices;
