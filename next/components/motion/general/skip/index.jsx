import React, { useState } from 'react';
import classNames from 'classnames';
import { TextButton } from '@thumbtack/thumbprint-react';
import { NavigationArrowRightSmall } from '@thumbtack/thumbprint-icons';

import styles from './index.module.scss';

const Skip = () => {
    const [active, setActive] = useState(1);
    return (
        <div className={styles.root}>
            <div className={styles.wrap}>
                <div
                    className={classNames({
                        [styles.box]: true,
                        [styles.active]: active === 1,
                    })}
                >
                    <div className={styles.item}>1 Room</div>
                    <div className={styles.item}>2 Rooms</div>
                </div>
                <div
                    className={classNames({
                        [styles.box]: true,
                        [styles.active]: active === 2,
                    })}
                >
                    <div className={styles.item}>Standard</div>
                    <div className={styles.item}>Deep</div>
                </div>
                <div
                    className={classNames({
                        [styles.box]: true,
                        [styles.active]: active === 3,
                    })}
                >
                    <div className={styles.item}>Window</div>
                    <div className={styles.item}>Fridge</div>
                </div>
            </div>
            <TextButton
                onClick={() => setActive(active > 2 ? 1 : active + 1)}
                iconRight={<NavigationArrowRightSmall />}
            >
                Skip
            </TextButton>
        </div>
    );
};

export default Skip;
