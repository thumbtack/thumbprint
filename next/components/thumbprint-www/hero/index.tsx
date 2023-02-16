import React from 'react';

import styles from './index.module.scss';

import heroImg from './heroImg.svg';
import thumbprintLogo from '../../../images/thumbprint-logo.svg';

const description = 'Assets for building high-quality, consistent user experiences at Thumbtack.';

export default function Hero(): JSX.Element {
    return (
        <div className={styles.hero}>
            <div className={styles.imageWrap}>
                <img src={heroImg.src} className={styles.image} alt="" />
            </div>
            <div className={styles.textBlock}>
                <img src={thumbprintLogo.src} className={styles.logo} alt="Thumbprint" />
                <div className={styles.subhead}>Design System</div>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
}
