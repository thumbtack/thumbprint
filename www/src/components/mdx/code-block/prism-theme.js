import {
    tpColorGray200,
    tpColorBlue500,
    tpColorIndigo600,
    tpColorBlack,
} from '@thumbtack/thumbprint-tokens';

const theme = {
    plain: {
        color: tpColorBlack,
        backgroundColor: tpColorGray200,
    },
    styles: [
        {
            types: ['prolog', 'comment', 'doctype', 'cdata'],
            style: {
                color: 'hsl(30, 20%, 50%)',
            },
        },
        {
            types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'],
            style: { color: tpColorBlue500 },
        },
        {
            types: ['attr-name', 'string', 'char', 'builtin', 'insterted'],
            style: {
                color: tpColorBlue500,
            },
        },
        {
            types: ['operator', 'entity', 'url', 'string', 'variable', 'language-css'],
            style: {
                color: 'hsl(40, 90%, 60%)',
            },
        },
        {
            types: ['deleted'],
            style: {
                color: 'rgb(255, 85, 85)',
            },
        },
        {
            types: ['italic'],
            style: {
                fontStyle: 'italic',
            },
        },
        {
            types: ['important', 'bold'],
            style: {
                fontWeight: 'bold',
            },
        },
        {
            types: ['regex', 'important'],
            style: {
                color: '#e90',
            },
        },
        {
            types: ['atrule', 'attr-value', 'keyword'],
            style: {
                color: tpColorIndigo600,
            },
        },
        {
            types: ['punctuation', 'symbol'],
            style: {
                opacity: '0.7',
            },
        },
    ],
};

export default theme;
