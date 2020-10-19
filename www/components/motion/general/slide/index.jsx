import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

const Slide = () => {
    const [active, setActive] = useState(false);
    return (
        <div className={styles.root}>
            <div
                className={classNames({
                    [styles.wrap]: true,
                    [styles.active]: active,
                })}
            >
                <div className={styles.box} />
            </div>
            <button className={styles.button} onClick={() => setActive(!active)} type="button" />
        </div>
    );
};

export default Slide;
