import React, { forwardRef, useState } from 'react';
import styles from './picture.module.scss';

const Picture = forwardRef((props, ref) => {
    const { src, sources, sizes, alt, style, ...rest } = props;

    const [loadedClass, setClass] = useState(null);

    function handleOnLoad() {
        setClass(styles.imageLoaded);
    }

    return (
        <picture>
            {sources.map(({ type, srcSet }) => (
                <source type={type} srcSet={srcSet} key={type} sizes={sizes} />
            ))}
            <img
                src={src}
                alt={alt}
                style={style}
                ref={ref}
                {...rest}
                onLoad={handleOnLoad}
                className={`${styles.imageLoading} ${loadedClass}`}
            />
        </picture>
    );
});

// Needed because of the `forwardRef`.
Picture.displayName = 'Picture';

export default Picture;
