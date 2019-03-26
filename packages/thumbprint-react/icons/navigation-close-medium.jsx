import React from 'react';

const NavigationCloseMedium = props => (
    <svg {...props}>
        <path d="M15.414 14l5.658-5.657a1 1 0 1 0-1.415-1.414L14 12.586 8.343 6.929a1 1 0 0 0-1.414 1.414L12.586 14l-5.657 5.657a1 1 0 1 0 1.414 1.414L14 15.414l5.66 5.66a.996.996 0 0 0 1.408 0 1.004 1.004 0 0 0 0-1.42L15.414 14z" />
    </svg>
);

NavigationCloseMedium.defaultProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'currentColor',
    width: '28',
    height: '28',
    viewBox: '0 0 28 28',
};

export default NavigationCloseMedium;
