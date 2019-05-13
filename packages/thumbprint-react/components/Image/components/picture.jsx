import React, { forwardRef } from 'react';

const Picture = forwardRef((props, ref) => {
    const { src, sources, sizes, alt, style, ...rest } = props;

    return (
        <picture>
            {sources.map(({ type, srcSet }) => (
                <source type={type} srcSet={srcSet} key={type} sizes={sizes} />
            ))}
            <img src={src} alt={alt} style={style} ref={ref} {...rest} />
        </picture>
    );
});

// Needed because of the `forwardRef`.
Picture.displayName = 'Picture';

export default Picture;
