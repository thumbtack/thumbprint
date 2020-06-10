import React from 'react';

const ContentActionsCheckSmall = props => (
    <svg {...props}>
        <path
            fillRule="evenodd"
            d="M14.5810763,3.19812449 C14.132085,2.85681117 13.5060971,2.96739243 13.1851033,3.44586905 L8.01720309,11.1408364 L4.52827048,8.83245251 C4.05827956,8.52197434 3.44229146,8.67402358 3.1502971,9.17270255 C2.85930272,9.67138151 3.00329993,10.3274261 3.47229088,10.6379043 L8.55419272,14 L14.8130718,4.68246529 C15.1350656,4.20398867 15.0300676,3.53943781 14.5810763,3.19812449"
        />
    </svg>
);

ContentActionsCheckSmall.defaultProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'currentColor',
    width: '18',
    height: '18',
    viewBox: '0 0 18 18',
};

export default ContentActionsCheckSmall;
