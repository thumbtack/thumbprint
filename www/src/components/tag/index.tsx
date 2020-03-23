import React from 'react';
import classNames from 'classnames';

const tagStyles = {
    letterSpacing: '0.5px',
    fontSize: '10px',
    textShadow: '1px 1px rgba(0,0,0,.2)',
};

interface PropTypes {
    className?: string;
    type: 'deprecated' | 'required';
}

export default function Tag({ type, className }: PropTypes): JSX.Element {
    return (
        <span
            className={classNames(`b ba bw-2 br2 ttu ph1 br1 white ${className}`, {
                'b-yellow bg-yellow': type === 'deprecated',
                'b-red bg-red': type === 'required',
            })}
            style={tagStyles}
        >
            {type}
        </span>
    );
}
