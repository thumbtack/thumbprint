import React from 'react';

const NavigationCaretDownSmall = props => (
    <svg {...props}>
        <path
            fillRule="evenodd"
            d="M14.646 6.764L9 13 3.311 6.725a1 1 0 0 1 1.342-1.482L9 10l4.285-4.699c.2-.187.435-.301.715-.301a1 1 0 0 1 1 1c0 .306-.151.537-.354.764z"
        />
    </svg>
);

NavigationCaretDownSmall.defaultProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'currentColor',
    width: '18',
    height: '18',
    viewBox: '0 0 18 18',
};

export default NavigationCaretDownSmall;
