import React from 'react';
import { mount } from 'enzyme';
import Image from './index';

jest.mock(
    'react-intersection-observer',
    (): any => ({
        InView: ({ children }): any => children({ inView: true, ref: null }),
        useInView: (): [(() => any), boolean] => [(): any => {}, true],
    }),
);

beforeEach(
    (): void => {
        window.IntersectionObserver = true as any;
    },
);

test('puts `alt` on the `img` tag', (): void => {
    const wrapper = mount(
        <Image
            src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg"
            alt="goose"
        />,
    );

    expect(wrapper.find('picture img').prop('alt')).toBe('goose');
    expect(wrapper.find('noscript img').prop('alt')).toBe('goose');
});

test('forwards props to the outermost element', (): void => {
    const wrapper = mount(
        <Image
            src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg"
            data-test="goose"
        />,
    );

    expect(wrapper.prop('data-test')).toBe('goose');
});
