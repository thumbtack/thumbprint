import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

const Color = () => {
    const [active, setActive] = useState(false);
    return (
        <div className={styles.root}>
            <div
                className={classNames({
                    [styles.box]: true,
                    [styles.active]: active,
                })}
            />
            <button className={styles.button} onClick={() => setActive(!active)} type="button" />
        </div>
    );
};

export default Color;
