import React from 'react';
import mousetrap from 'mousetrap';

import 'docsearch.js/dist/npm/styles/main.scss';

interface DocSearchProps {
    children: (props: { id: string }) => JSX.Element;
}

export default class DocSearch extends React.Component<DocSearchProps> {
    inputSelector: string;

    constructor(props: DocSearchProps) {
        super(props);
        this.inputSelector = 'thumbprint-algolia-doc-search';

        this.focusInput = this.focusInput.bind(this);
    }

    async componentDidMount(): Promise<void> {
        // Focus on search when `/` is pressed.
        if (typeof window !== 'undefined') {
            mousetrap.bind(['/'], this.focusInput, 'keyup');
        }

        // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
        const docsearch = require('docsearch.js');

        docsearch({
            apiKey: 'e5314d1bc146a7d26433a00e2031794c',
            indexName: 'thumbprint',
            inputSelector: `#${this.inputSelector}`,
            transformData(suggestions: { url: string }[]) {
                if (process.env.NODE_ENV === 'production') {
                    return suggestions;
                }

                return suggestions.map(suggestion => ({
                    ...suggestion,
                    url: suggestion.url.replace(
                        'https://thumbprint.design/',
                        'http://localhost:8090/',
                    ),
                }));
            },
        });
    }

    componentWillUnmount(): void {
        if (typeof window !== 'undefined') {
            mousetrap.unbind(['/'], this.focusInput);
        }
    }

    focusInput(): void {
        document.getElementById(this.inputSelector)?.focus();
    }

    render(): JSX.Element {
        const { children } = this.props;

        return children({ id: this.inputSelector });
    }
}
