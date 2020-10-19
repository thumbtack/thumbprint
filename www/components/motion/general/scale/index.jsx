import React from 'react';
import { Title, Text } from '@thumbtack/thumbprint-react';

import styles from './index.module.scss';

const Scale = () => {
    return (
        <div className={styles.root}>
            <div className={`ba b-gray-300 br2 overflow-hidden w-80 ${styles.box}`}>
                <div className={styles.image} />
                <div className="pa2 bg-white">
                    <Title size={6}>Training</Title>
                    <Text size={3} className="black-300">
                        Waitng for response
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default Scale;
