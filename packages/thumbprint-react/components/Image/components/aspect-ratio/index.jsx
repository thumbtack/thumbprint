import React from 'react';

const AspectRatio = ({ children, ratio }) => (
    <div
        style={{
            height: 0,
            position: 'relative',
            paddingBottom: `${ratio * 100}%`,
        }}
    >
        {children({
            childStyles: {
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
            },
        })}
    </div>
);

export default AspectRatio;
