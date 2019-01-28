import React from 'react';
import styles from './index.module.scss';
import IntroImg from './heroImg.svg';
import ThumbprintLogo from '../../container/thumbprintLogo.svg';

const description = 'Assets for building high-quality, consistent user experiences at Thumbtack.';

const Hero = () => (
    <div className={styles.hero}>
        <div className={styles.imageWrap}>
            <IntroImg className={styles.image} />
        </div>
        <div className={styles.textBlock}>
            <ThumbprintLogo className={styles.logo} />
            <div className={styles.subhead}>Design System</div>
            <div className={styles.description}>{description}</div>
        </div>
    </div>
);

export default Hero;
