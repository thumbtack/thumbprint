import React from 'react';
import { mount } from 'enzyme';
import Image from './index';

/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('react-intersection-observer', (): any => ({
    InView: ({ children }: { children: (arg1: any) => any }): any =>
        children({ inView: true, ref: null }),
    useInView: (): any => [(): any => {}, true],
}));

beforeEach((): void => {
    window.IntersectionObserver = true as any;
});
/* eslint-enable */

test('puts `alt` on the `img` tag', () => {
    const wrapper = mount(
        <Image
            src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg"
            alt="goose"
        />,
    );

    expect(wrapper.find('picture img').prop('alt')).toBe('goose');
    expect(wrapper.find('noscript img').prop('alt')).toBe('goose');
});

test('forwards props to the outermost element', () => {
    const wrapper = mount(
        <Image
            src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg"
            data-test="goose"
        />,
    );

    expect(wrapper.prop('data-test')).toBe('goose');
});
