import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Tooltip from './index';

jest.useFakeTimers();

// https://github.com/thumbtack/thumbprint/issues/72
// https://github.com/FezVrasta/popper.js/issues/478#issuecomment-341494703
jest.mock('popper.js', () => {
    const PopperJS = jest.requireActual('popper.js');

    class Popper {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        static placements: any;

        constructor() {
            return {
                destroy: (): void => {},
                scheduleUpdate: (): void => {},
            };
        }
    }

    Popper.placements = PopperJS.placements;

    return Popper;
});

describe('Tooltip', () => {
    test('renders a closed tooltip', () => {
        const wrapper = mount(
            <Tooltip text="Goose">
                {({
                    ref,
                    onMouseEnter,
                    onClick,
                    onFocus,
                    onMouseLeave,
                    onBlur,
                    ariaLabel,
                }): JSX.Element => (
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
                {({
                    ref,
                    onMouseEnter,
                    onClick,
                    onFocus,
                    onMouseLeave,
                    onBlur,
                    ariaLabel,
                }): JSX.Element => (
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
        button.simulate('focus');
        jest.runAllTimers();

        expect(wrapper).toMatchSnapshot();

        button.simulate('blur');
        jest.runAllTimers();
    });

    test('adds `zIndex`', () => {
        const wrapper = mount(
            <Tooltip text="Goose" zIndex={123}>
                {({
                    ref,
                    onMouseEnter,
                    onClick,
                    onFocus,
                    onMouseLeave,
                    onBlur,
                    ariaLabel,
                }): JSX.Element => (
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
        button.simulate('focus');
        jest.runAllTimers();

        expect(wrapper).toMatchSnapshot();

        button.simulate('blur');
        jest.runAllTimers();
    });

    test('renders an open tooltip with `bottom` placement', () => {
        const wrapper = mount(
            <Tooltip text="Goose" position="bottom">
                {({
                    ref,
                    onMouseEnter,
                    onClick,
                    onFocus,
                    onMouseLeave,
                    onBlur,
                    ariaLabel,
                }): JSX.Element => (
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
        button.simulate('focus');
        jest.runAllTimers();
        expect(wrapper).toMatchSnapshot();
        button.simulate('blur');
        jest.runAllTimers();
    });

    test('renders an open tooltip with a `light` theme', () => {
        const wrapper = mount(
            <Tooltip text="Goose" theme="light">
                {({
                    ref,
                    onMouseEnter,
                    onClick,
                    onFocus,
                    onMouseLeave,
                    onBlur,
                    ariaLabel,
                }): JSX.Element => (
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
        button.simulate('focus');
        jest.runAllTimers();
        expect(wrapper).toMatchSnapshot();
        button.simulate('blur');
        jest.runAllTimers();
    });

    test('renders an inline tooltip', () => {
        const wrapper = mount(
            <Tooltip text="Goose" container="inline">
                {({
                    ref,
                    onMouseEnter,
                    onClick,
                    onFocus,
                    onMouseLeave,
                    onBlur,
                    ariaLabel,
                }): JSX.Element => (
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
        button.simulate('focus');
        jest.runAllTimers();
        expect(wrapper).toMatchSnapshot();
        button.simulate('blur');
        jest.runAllTimers();
    });

    test('Pressing the `Esc` key closes the tooltip', () => {
        const wrapper = mount(
            <Tooltip text="Goose" container="inline">
                {({
                    ref,
                    onMouseEnter,
                    onClick,
                    onFocus,
                    onMouseLeave,
                    onBlur,
                    ariaLabel,
                }): JSX.Element => (
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

        expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);

        button.simulate('focus');
        expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

        act(() => {
            // NOTE: it seems that Enzyme does not respond to the standard properties on
            // `KeyboardEventInit`, either `code: 'Escape'` or `key: 'Escape'`. It only responds to
            // the deprecated property `keyCode`, which is not in the type defintion. As such we
            // have to cast the type here to prevent an error.
            document.dispatchEvent(
                new KeyboardEvent('keyup', {
                    key: 'Escape',
                    code: 'Escape',
                    keyCode: 27,
                } as KeyboardEventInit),
            );
        });
        wrapper.update();

        expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
    });

    test('Events from tooltip element propagate to parent element', () => {
        const jestOnClick = jest.fn();
        const wrapper = mount(
            <Tooltip text="Goose">
                {({
                    ref,
                    onMouseEnter,
                    onClick,
                    onFocus,
                    onMouseLeave,
                    onBlur,
                    ariaLabel,
                }): JSX.Element => (
                    <button
                        ref={ref}
                        onMouseEnter={onMouseEnter}
                        onClick={(): void => {
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
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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

        act(() => {
            jest.runAllTimers();
        });

        wrapper
            // Need to manually call update here because setState is called asynchronously in the
            // show method.
            .update()
            .find('[role="tooltip"]')
            .simulate('click');
        expect(jestOnClick).toHaveBeenCalledTimes(0);
    });

    test('Events from PositionedTooltip do propagate to parent container when `container` is `inline`', () => {
        const jestOnClick = jest.fn();

        const wrapper = mount(
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div onClick={jestOnClick}>
                <Tooltip text="Goose" container="inline">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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

        act(() => {
            jest.runAllTimers();
        });

        wrapper
            // Need to manually call update here because setState is called asynchronously in the
            // show method.
            .update()
            .find('[role="tooltip"]')
            .simulate('click');
        expect(jestOnClick).toHaveBeenCalledTimes(1);
    });

    describe('non-touch devices', () => {
        test('`mouseenter` and `mouseleave` open and close the tooltip', () => {
            const wrapper = mount(
                <Tooltip text="Goose" container="inline">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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

            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);

            button.simulate('mouseenter');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);

            act(() => {
                jest.runAllTimers();
            });
            wrapper.update();
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

            button.simulate('mouseleave');
            act(() => {
                jest.runAllTimers();
            });
            wrapper.update();
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
        });

        test('`focus` and `blur` open and close the tooltip', () => {
            const wrapper = mount(
                <Tooltip text="Goose" container="inline">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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

            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);

            button.simulate('focus');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

            button.simulate('blur');
            act(() => {
                jest.runAllTimers();
            });
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
        });

        test("click doesn't do anything", () => {
            const wrapper = mount(
                <Tooltip text="Goose" container="inline">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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

            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);

            button.simulate('click');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
        });

        test("click on tooltip body doesn't do anything", () => {
            const wrapper = mount(
                <Tooltip text="Goose" container="inline">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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
            button.simulate('focus');
            jest.runAllTimers();

            wrapper.find('[role="tooltip"]').simulate('click');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

            button.simulate('blur');
            jest.runAllTimers();
        });
    });

    describe('touch devices', () => {
        beforeAll(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (global as any).window.ontouchstart = {};
        });

        afterAll(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (global as any).window.ontouchstart;
        });

        test('`click` opens the tooltip on first click and closes on second', () => {
            const wrapper = mount(
                <Tooltip text="Goose">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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

            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);

            button.simulate('click');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

            button.simulate('click');
            jest.runAllTimers();
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
        });

        test("focus doesn't do anything", () => {
            const wrapper = mount(
                <Tooltip text="Goose">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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

            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);

            button.simulate('focus');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
        });

        test('`blur` closes the tooltip', () => {
            const wrapper = mount(
                <Tooltip text="Goose">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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
            button.simulate('click');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

            button.simulate('blur');
            act(() => {
                jest.runAllTimers();
            });
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
        });

        test('`mouseleave` closes the tooltip after a 200ms delay', () => {
            const delayLength = 200;

            const wrapper = mount(
                <Tooltip text="Goose" closeDelayLength={delayLength}>
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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

            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
            const button = wrapper.find('button');

            button.simulate('click');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

            button.simulate('mouseleave');
            act(() => {
                jest.runAllTimers();
            });
            wrapper.update();
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
        });

        test('`mouseleave` closes the tooltip immediately if `closeDelayLength` is `0`', () => {
            const delayLength = 0;

            const wrapper = mount(
                <Tooltip text="Goose" closeDelayLength={delayLength}>
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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

            button.simulate('click');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

            button.simulate('mouseleave');
            act(() => {
                jest.advanceTimersByTime(delayLength);
            });
            wrapper.update();
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
        });

        test("mouseenter doesn't do anything", () => {
            const wrapper = mount(
                <Tooltip text="Goose" container="inline">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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

            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);

            button.simulate('mouseenter');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
        });

        test('`click` on PositionedTooltip would close it', () => {
            const wrapper = mount(
                <Tooltip text="Goose" container="inline">
                    {({
                        ref,
                        onMouseEnter,
                        onClick,
                        onFocus,
                        onMouseLeave,
                        onBlur,
                        ariaLabel,
                    }): JSX.Element => (
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
            button.simulate('click');
            jest.runAllTimers();

            wrapper.find('[role="tooltip"]').simulate('click');
            expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
        });
    });

    test("text can be changed while it's open", () => {
        const wrapper = mount(
            <Tooltip text="Goose" container="inline">
                {({
                    ref,
                    onMouseEnter,
                    onClick,
                    onFocus,
                    onMouseLeave,
                    onBlur,
                    ariaLabel,
                }): JSX.Element => (
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
        button.simulate('focus');
        jest.runAllTimers();

        wrapper.setProps({ text: 'Swan' });

        expect(wrapper.find('[role="tooltip"]').text()).toContain('Swan');
    });
});
