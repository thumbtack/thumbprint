import React from 'react';
import slugify from 'slugify';
import { isString, isNumber, isBoolean } from 'lodash';

/**
 * Turns heading contents into a string that can be used as a slug. This is compliated because
 * `MDXProvider` sometimes receives a string and other times it recieves an array of strings
 * and React components. In the latter case, we must grab the text from the components to turn
 * them into text.
 */
const generateSlug = ({
    level,
    children,
}: {
    level: string;
    children: React.ReactNode;
}): string | undefined => {
    const text = React.Children.map(children, c => {
        if (isString(c)) {
            return c;
        }

        if (isNumber(c)) {
            return `${c}`;
        }

        if (isBoolean(c)) {
            return `${c}`;
        }

        if (c === null || c === undefined) {
            return '';
        }

        if (c instanceof React.Component && c.props && isString(c.props.children)) {
            return c.props.children;
        }

        return '';
    });

    if (!text) {
        return undefined;
    }

    return `${level}-${slugify(text.join(''), { lower: true })}`;
};

export default generateSlug;
