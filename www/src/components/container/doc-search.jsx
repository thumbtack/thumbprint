import React from 'react';
import PropTypes from 'prop-types';
import mousetrap from 'mousetrap';
import docsearch from '@docsearch/js';
import '@docsearch/css';

class DocSearch extends React.Component {
    constructor(props) {
        super(props);
        this.inputSelector = 'thumbprint-algolia-doc-search';

        this.focusInput = this.focusInput.bind(this);
    }

    async componentDidMount() {
        // Focus on search when `/` is pressed.
        if (typeof window !== 'undefined') {
            mousetrap.bind(['/'], this.focusInput, 'keyup');
        }

        docsearch({
            apiKey: 'e5314d1bc146a7d26433a00e2031794c',
            indexName: 'thumbprint',
            inputSelector: `#${this.inputSelector}`,
            transformData(suggestions) {
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

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            mousetrap.unbind(['/'], this.focusInput);
        }
    }

    focusInput() {
        document.getElementById(this.inputSelector).focus();
    }

    render() {
        const { children } = this.props;

        return children({ id: this.inputSelector });
    }
}

DocSearch.propTypes = {
    children: PropTypes.func.isRequired,
};

export default DocSearch;
