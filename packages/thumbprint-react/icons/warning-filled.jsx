import React from 'react';

const WarningFilled = (props) => (
    <svg {...props}>
        <path d="M13.9985 21.5C13.1695 21.5 12.4985 20.829 12.4985 20C12.4985 19.171 13.1695 18.5 13.9985 18.5C14.8275 18.5 15.4985 19.171 15.4985 20C15.4985 20.829 14.8275 21.5 13.9985 21.5ZM12.9995 10C12.9995 9.448 13.4475 9 13.9995 9C14.5525 9 14.9995 9.448 14.9995 10V16C14.9995 16.552 14.5525 17 13.9995 17C13.4475 17 12.9995 16.552 12.9995 16V10ZM25.4195 18.502L17.7805 5.187C16.9955 3.817 15.5815 3 13.9995 3C12.4175 3 11.0045 3.817 10.2195 5.187L2.58054 18.502C1.80154 19.858 1.80554 21.476 2.58854 22.829C3.37554 24.188 4.78654 25 6.36054 25H21.6395C23.2135 25 24.6235 24.188 25.4115 22.829C26.1945 21.476 26.1985 19.858 25.4195 18.502Z" />{' '}
    </svg>
);

WarningFilled.defaultProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'currentColor',
    width: '28',
    height: '28',
    viewBox: '0 0 28 28',
};

export default WarningFilled;
