import React, { useState } from 'react';
import styles from './picture.module.scss';

const Picture = props => {
    const { src, sources, sizes, alt, style, ...rest } = props;

    // We separate `webp` from the `jpeg`/`png` so that we can apply the `imgTagSource` directly
    // onto the `img` tag. While this makes the code messier, it is needed to work around a bug in
    // Safari:
    // - https://bugs.webkit.org/show_bug.cgi?id=190031
    // - https://bugs.webkit.org/show_bug.cgi?id=177068
    const webpSource = sources.find(s => s.type === 'image/webp');
    const imgTagSource = sources.find(s => s.type === 'image/jpeg' || s.type === 'image/png');

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <picture>
            {webpSource && (
                <source type={webpSource.type} srcSet={webpSource.srcSet} sizes={sizes} />
            )}
            <img
                // The order of `sizes`, `srcSet`, and `src` is important to work around a bug in
                // Safari. Once the bug is fixed, we should simplify this by using `src` on the
                // `img` tag and using `source` tags.
                sizes={sizes}
                srcSet={imgTagSource && imgTagSource.srcSet}
                src={src}
                alt={alt}
                style={style}
                {...rest}
                onLoad={() => {
                    setIsLoaded(true);
                }}
                className={isLoaded ? styles.imageLoaded : styles.imageLoading}
            />
        </picture>
    );
};

export default Picture;
