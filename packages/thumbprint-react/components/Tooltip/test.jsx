import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { mount } from 'enzyme';
import Tooltip from './index';

const ESC_KEY = 27;

jest.useFakeTimers();

// https://github.com/thumbtack/thumbprint/issues/72
// https://github.com/FezVrasta/popper.js/issues/478#issuecomment-341494703
jest.mock('popper.js', () => {
    const PopperJS = jest.requireActual('popper.js');

    class Popper {
        constructor() {
            return {
                destroy: () => {},
                scheduleUpdate: () => {},
            };
        }
    }

    Popper.placements = PopperJS.placements;

    return Popper;
});

test('renders a closed tooltip', () => {
    const wrapper = mount(
        <Tooltip text="Goose">
            {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                <button
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    onFocus={onFocus}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    aria-label={ariaLabel}
                    type="button"
                >
                    Duck
                </button>
            )}
        </Tooltip>,
    );

    expect(wrapper).toMatchSnapshot();
});

test('renders an open tooltip', () => {
    const wrapper = mount(
        <Tooltip text="Goose">
            {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                <button
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    onFocus={onFocus}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    aria-label={ariaLabel}
                    type="button"
                >
                    Duck
                </button>
            )}
        </Tooltip>,
    );

    wrapper.setState({ isOpen: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({ isOpen: false });
});

test('adds `zIndex`', () => {
    const wrapper = mount(
        <Tooltip text="Goose" zIndex={123}>
            {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                <button
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    onFocus={onFocus}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    aria-label={ariaLabel}
                    type="button"
                >
                    Duck
                </button>
            )}
        </Tooltip>,
    );

    wrapper.setState({ isOpen: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({ isOpen: false });
});

test('does not render tooltip when rendered on the server', () => {
    const component = (
        <Tooltip text="Goose">
            {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                <button
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    onFocus={onFocus}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    aria-label={ariaLabel}
                    type="button"
                >
                    Duck
                </button>
            )}
        </Tooltip>
    );

    // See if `test-id` exists when rendered client-side before asserting it doesn't exist on SSR.
    const clientSide = mount(component);
    clientSide.setState({ isOpen: true });
    expect(clientSide.find('[data-test-id="tooltip"]')).toHaveLength(1);

    const ssrHTML = ReactDOMServer.renderToStaticMarkup(component);
    expect(ssrHTML).not.toContain('data-test-id="tooltip"');

    clientSide.setState({ isOpen: false });
});

test('renders an open tooltip with `bottom` placement', () => {
    const wrapper = mount(
        <Tooltip text="Goose" position="bottom">
            {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                <button
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    onFocus={onFocus}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    aria-label={ariaLabel}
                    type="button"
                >
                    Duck
                </button>
            )}
        </Tooltip>,
    );

    wrapper.setState({ isOpen: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({ isOpen: false });
});

test('renders an open tooltip with a `light` theme', () => {
    const wrapper = mount(
        <Tooltip text="Goose" theme="light">
            {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                <button
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    onFocus={onFocus}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    aria-label={ariaLabel}
                    type="button"
                >
                    Duck
                </button>
            )}
        </Tooltip>,
    );

    wrapper.setState({ isOpen: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({ isOpen: false });
});

test('renders an inline tooltip', () => {
    const wrapper = mount(
        <Tooltip text="Goose" container="inline">
            {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                <button
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    onFocus={onFocus}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    aria-label={ariaLabel}
                    type="button"
                >
                    Duck
                </button>
            )}
        </Tooltip>,
    );

    wrapper.setState({ isOpen: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.setState({ isOpen: false });
});

test('Pressing the `Esc` key closes the tooltip', () => {
    const wrapper = mount(
        <Tooltip text="Goose" container="inline">
            {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                <button
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    onFocus={onFocus}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    aria-label={ariaLabel}
                    type="button"
                >
                    Duck
                </button>
            )}
        </Tooltip>,
    );

    const button = wrapper.find('button');

    expect(wrapper.state('isOpen')).toBe(false);

    button.simulate('focus');
    expect(wrapper.state('isOpen')).toBe(true);

    const event = new KeyboardEvent('keyup', { keyCode: ESC_KEY });
    document.dispatchEvent(event);

    expect(wrapper.state('isOpen')).toBe(false);
});

test('Events from tooltip element propagate to parent element', () => {
    const jestOnClick = jest.fn();
    const wrapper = mount(
        <Tooltip text="Goose">
            {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                <button
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onClick={() => {
                        onClick();
                        jestOnClick();
                    }}
                    onFocus={onFocus}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    aria-label={ariaLabel}
                    type="button"
                >
                    Duck
                </button>
            )}
        </Tooltip>,
    );
    expect(jestOnClick).toHaveBeenCalledTimes(0);
    wrapper.find('button').simulate('click');
    expect(jestOnClick).toHaveBeenCalledTimes(1);
});

test('Events from PositionedTooltip do not propagate to parent container when `container` is `body`', () => {
    const jestOnClick = jest.fn();

    const wrapper = mount(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div onClick={jestOnClick}>
            <Tooltip text="Goose" container="body">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>
        </div>,
    );
    expect(jestOnClick).toHaveBeenCalledTimes(0);
    wrapper.find('button').simulate('mouseenter');
    expect(jestOnClick).toHaveBeenCalledTimes(0);
    jest.runAllTimers();
    wrapper
        // Need to manually call `update` here because `setState` is called asynchronously in the
        // `show` method.
        .update()
        .find('PositionedTooltip')
        .simulate('click');
    expect(jestOnClick).toHaveBeenCalledTimes(0);
});

test('Events from PositionedTooltip do propagate to parent container when `container` is `inline`', () => {
    const jestOnClick = jest.fn();

    const wrapper = mount(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div onClick={jestOnClick}>
            <Tooltip text="Goose" container="inline">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>
        </div>,
    );
    expect(jestOnClick).toHaveBeenCalledTimes(0);
    wrapper.find('button').simulate('mouseenter');
    expect(jestOnClick).toHaveBeenCalledTimes(0);
    jest.runAllTimers();
    wrapper
        // Need to manually call `update` here because `setState` is called asynchronously in the
        // `show` method.
        .update()
        .find('PositionedTooltip')
        .simulate('click');
    expect(jestOnClick).toHaveBeenCalledTimes(1);
});

describe('non-touch devices', () => {
    test('`mouseenter` and `mouseleave` open and close the tooltip', () => {
        const wrapper = mount(
            <Tooltip text="Goose" container="inline">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );

        const button = wrapper.find('button');

        expect(wrapper.state('isOpen')).toBe(false);

        button.simulate('mouseenter');
        expect(wrapper.state('isOpen')).toBe(false);

        jest.runAllTimers();
        expect(wrapper.state('isOpen')).toBe(true);

        button.simulate('mouseleave');
        jest.runAllTimers();
        expect(wrapper.state('isOpen')).toBe(false);
    });

    test('`focus` and `blur` open and close the tooltip', () => {
        const wrapper = mount(
            <Tooltip text="Goose" container="inline">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );

        const button = wrapper.find('button');

        expect(wrapper.state('isOpen')).toBe(false);

        button.simulate('focus');
        expect(wrapper.state('isOpen')).toBe(true);

        button.simulate('blur');
        jest.runAllTimers();
        expect(wrapper.state('isOpen')).toBe(false);
    });

    test("`click` doesn't do anything", () => {
        const wrapper = mount(
            <Tooltip text="Goose" container="inline">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );

        const button = wrapper.find('button');

        expect(wrapper.state('isOpen')).toBe(false);

        button.simulate('click');
        expect(wrapper.state('isOpen')).toBe(false);
    });

    test("`click` on PositionedTooltip doesn't do anything", () => {
        const wrapper = mount(
            <Tooltip text="Goose" container="inline">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );
        wrapper.setState({ isOpen: true });

        wrapper.find('PositionedTooltip').simulate('click');
        expect(wrapper.state('isOpen')).toBe(true);

        wrapper.setState({ isOpen: false });
    });
});

describe('touch devices', () => {
    beforeAll(() => {
        global.window.ontouchstart = {};
    });

    afterAll(() => {
        delete global.window.ontouchstart;
    });

    test('`click` opens the tooltip on first click and closes on second', () => {
        const wrapper = mount(
            <Tooltip text="Goose">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );

        const button = wrapper.find('button');

        expect(wrapper.state('isOpen')).toBe(false);

        button.simulate('click');
        expect(wrapper.state('isOpen')).toBe(true);

        button.simulate('click');
        jest.runAllTimers();
        expect(wrapper.state('isOpen')).toBe(false);
    });

    test("`focus` doesn't do anything", () => {
        const wrapper = mount(
            <Tooltip text="Goose">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );

        const button = wrapper.find('button');

        expect(wrapper.state('isOpen')).toBe(false);

        button.simulate('focus');
        expect(wrapper.state('isOpen')).toBe(false);
    });

    test('`blur` closes the tooltip', () => {
        const wrapper = mount(
            <Tooltip text="Goose">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );

        const button = wrapper.find('button');

        wrapper.setState({ isOpen: true });
        expect(wrapper.state('isOpen')).toBe(true);

        button.simulate('blur');
        jest.runAllTimers();
        expect(wrapper.state('isOpen')).toBe(false);
    });

    test('`mouseleave` closes the tooltip after a 200ms delay', () => {
        const delayLength = 200;

        const wrapper = mount(
            <Tooltip text="Goose" closeDelayLength={delayLength}>
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );

        const button = wrapper.find('button');

        wrapper.setState({ isOpen: true });
        expect(wrapper.state('isOpen')).toBe(true);

        button.simulate('mouseleave');
        jest.advanceTimersByTime(delayLength);
        expect(wrapper.state('isOpen')).toBe(false);
    });

    test('`mouseleave` closes the tooltip immediately if `closeDelayLength` is `0`', () => {
        const delayLength = 0;

        const wrapper = mount(
            <Tooltip text="Goose" closeDelayLength={delayLength}>
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );

        const button = wrapper.find('button');

        wrapper.setState({ isOpen: true });
        expect(wrapper.state('isOpen')).toBe(true);

        button.simulate('mouseleave');
        jest.advanceTimersByTime(delayLength);
        expect(wrapper.state('isOpen')).toBe(false);
    });

    test("`mouseenter` doesn't do anything", () => {
        const wrapper = mount(
            <Tooltip text="Goose" container="inline">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );

        const button = wrapper.find('button');

        expect(wrapper.state('isOpen')).toBe(false);

        button.simulate('mouseenter');
        expect(wrapper.state('isOpen')).toBe(false);
    });

    test('`click` on PositionedTooltip would close it', () => {
        const wrapper = mount(
            <Tooltip text="Goose" container="inline">
                {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        onFocus={onFocus}
                        onMouseLeave={onMouseLeave}
                        onBlur={onBlur}
                        aria-label={ariaLabel}
                        type="button"
                    >
                        Duck
                    </button>
                )}
            </Tooltip>,
        );
        wrapper.setState({ isOpen: true });

        wrapper.find('PositionedTooltip').simulate('click');
        expect(wrapper.state('isOpen')).toBe(false);
    });
});

test("text can be changed while it's open", () => {
    const wrapper = mount(
        <Tooltip text="Goose" container="inline">
            {({ ref, onMouseEnter, onClick, onFocus, onMouseLeave, onBlur, ariaLabel }) => (
                <button
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    onFocus={onFocus}
                    onMouseLeave={onMouseLeave}
                    onBlur={onBlur}
                    aria-label={ariaLabel}
                    type="button"
                >
                    Duck
                </button>
            )}
        </Tooltip>,
    );
    wrapper.setState({ isOpen: true });
    wrapper.setProps({ text: 'Swan' });
    expect(wrapper.find('PositionedTooltip').text()).toContain('Swan');
});
