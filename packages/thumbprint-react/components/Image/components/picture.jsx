import React, { useState } from 'react';
import styles from './picture.module.scss';

const Picture = props => {
    const { src, sources, sizes, alt, style, ...rest } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const isResponsive = sources && sources.length > 0;

    const img = (
        <img
            src={src}
            alt={alt}
            style={style}
            {...rest}
            onLoad={() => {
                setIsLoaded(true);
            }}
            className={isLoaded ? styles.imageLoaded : styles.imageLoading}
        />
    );

    if (isResponsive) {
        return (
            <picture>
                {sources.map(({ type, srcSet }) => (
                    <source type={type} srcSet={srcSet} key={type} sizes={sizes} />
                ))}
                {img}
            </picture>
        );
    }

    return img;
};

export default Picture;
