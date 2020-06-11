import React from 'react';

const NavigationCloseSmall = props => (
    <svg {...props}>
        <path
            fillRule="evenodd"
            d="M9.014 7.6L4.771 3.357a1 1 0 1 0-1.414 1.414L7.6 9.014l-4.243 4.243a1 1 0 1 0 1.414 1.414l4.243-4.243 4.243 4.243a1 1 0 0 0 1.414-1.414l-4.243-4.243 4.243-4.243a1 1 0 0 0-1.414-1.414L9.014 7.6z"
        />
    </svg>
);

NavigationCloseSmall.defaultProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'currentColor',
    width: '18',
    height: '18',
    viewBox: '0 0 18 18',
};

export default NavigationCloseSmall;
