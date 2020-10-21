import React from 'react';
import { mount } from 'enzyme';
import Image from './index';

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
            data-testid="goose"
        />,
    );

    expect(wrapper.prop('data-testid')).toBe('goose');
});

test('creates one IntersectionObserver instance if there is one scrollable parent', () => {
    // The `<body>` is the scrollable parent in this case.
    mount(
        <Image src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg" />,
    );

    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
});

test('creates two IntersectionObserver instances if there are two scrollable parents', () => {
    mount(
        <div style={{ overflowX: 'scroll' }}>
            <Image src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg" />
        </div>,
    );

    expect(window.IntersectionObserver).toHaveBeenCalledTimes(2);
});

test('creates three IntersectionObserver instances if there are three scrollable parents', () => {
    mount(
        <React.Fragment>
            <header css={{ overflowX: 'scroll' }}>Header</header>
            <main style={{ overflowX: 'auto' }}>
                <div>
                    <div style={{ overflowX: 'scroll' }}>
                        <Image src="https://d1vg1gqh4nkuns.cloudfront.net/i/356206765797793818/width/1024.jpeg" />
                    </div>
                </div>
                <div>Sidebar</div>
            </main>
        </React.Fragment>,
    );

    expect(window.IntersectionObserver).toHaveBeenCalledTimes(3);
});
