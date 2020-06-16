import React from 'react';
import { mount } from 'enzyme';
import Image from './index';

const observerMap = new Map();
const instanceMap = new Map();

beforeAll(() => {
    // Mock `window.IntersectionObserver` using code from these two places:
    // https://github.com/thebuilder/react-intersection-observer/blob/e31086c713615f3cfbe60eaa13491adcee3d41c2/src/test-utils.ts#L83
    // https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
    window.IntersectionObserver = {
        writable: true,
        value: jest.fn((cb, options) => {
            const instance = {
                thresholds: Array.isArray(options.threshold)
                    ? options.threshold
                    : [options.threshold],
                root: options.root,
                rootMargin: options.rootMargin,
                time: Date.now(),
                observe: jest.fn(element => {
                    instanceMap.set(element, instance);
                    observerMap.set(element, cb);
                }),
                unobserve: jest.fn(element => {
                    instanceMap.delete(element);
                    observerMap.delete(element);
                }),
                disconnect: jest.fn(),
            };
            return instance;
        }),
    };
});

afterAll(() => {
    window.IntersectionObserver.mockClear();
    instanceMap.clear();
    observerMap.clear();
});

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
