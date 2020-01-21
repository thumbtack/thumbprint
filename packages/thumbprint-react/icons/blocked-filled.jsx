import React from 'react';

const BlockedFilled = props => (
    <svg {...props}>
        <path d="M13.9996 2.00006C20.627 2.00006 25.9996 7.37263 25.9996 14C25.9996 20.6274 20.627 26 13.9996 26C7.3722 26 1.99963 20.6274 1.99963 14C1.99963 7.37263 7.3722 2.00006 13.9996 2.00006ZM21 13H7.00002C6.44774 13 6.00002 13.4477 6.00002 14C6.00002 14.5523 6.44774 15 7.00002 15H21C21.5523 15 22 14.5523 22 14C22 13.4477 21.5523 13 21 13Z" />{' '}
    </svg>
);

BlockedFilled.defaultProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'currentColor',
    width: '28',
    height: '28',
    viewBox: '0 0 28 28',
};

export default BlockedFilled;
