import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '@thumbtack/thumbprint-react';
import { NavigationCloseTiny } from '@thumbtack/thumbprint-icons';

import styles from './index.module.scss';

const Banner = () => {
    const [active, setActive] = useState(false);
    return (
        <div className={styles.root}>
            <div
                className={classNames('white pa3 b bg-green', {
                    [styles.box]: true,
                    [styles.active]: active,
                })}
            >
                <div>Preferences saved.</div>
                <NavigationCloseTiny
                    className={styles.closeIcon}
                    onClick={() => setActive(!active)}
                />
            </div>
            <Button theme="tertiary" size="small" onClick={() => setActive(!active)}>
                Save
            </Button>
        </div>
    );
};

export default Banner;
