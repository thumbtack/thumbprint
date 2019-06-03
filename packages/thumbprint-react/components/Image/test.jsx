import React from 'react';
import { mount } from 'enzyme';
import Image from './index';

jest.mock('react-intersection-observer', () => ({
    InView: ({ children }) => children({ inView: true, ref: null }),
    useInView: () => [() => {}, true],
}));

beforeEach(() => {
    window.IntersectionObserver = true;
});

test('puts `alt` on the `img` tag', () => {
    const wrapper = mount(
        <Image
            src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg"
            alt="goose"
        />,
    );

    expect(wrapper.find('img').prop('alt')).toBe('goose');
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
