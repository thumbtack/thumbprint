import React from 'react';
import { mount } from 'enzyme';
import Popover from './index';

// https://github.com/thumbtack/thumbprint/issues/72
// https://github.com/FezVrasta/popper.js/issues/478#issuecomment-341494703
jest.mock('popper.js', (): object => {
    const PopperJS = jest.requireActual('popper.js');

    class Popper {
        public static placements: typeof PopperJS.placements;

        public constructor() {
            return {
                destroy: (): void => {},
                scheduleUpdate: (): void => {},
            };
        }
    }

    Popper.placements = PopperJS.placements;

    return Popper;
});

test('renders a popover', (): void => {
    const onCloseClick = jest.fn();
    const wrapper = mount(
        <Popover isOpen onCloseClick={onCloseClick} launcher={(): null => null}>
            Goose
        </Popover>,
    );

    expect(wrapper).toMatchSnapshot();
});

test('initially traps focus to wrapper, not the focusable child', (): void => {
    jest.useFakeTimers();

    const onCloseClick = jest.fn();
    const wrapper = mount(
        <Popover isOpen onCloseClick={onCloseClick} launcher={(): null => null}>
            <button type="button" id="hi">
                Hi
            </button>
        </Popover>,
    );

    // Run setTimeouts() in focus-trap to completion
    jest.runAllTimers();

    const modalWrapper = wrapper.find('[role="dialog"]');
    expect(modalWrapper.is(':focus')).toBe(true);

    const button = wrapper.find('#hi');
    expect(button.is(':focus')).toBe(false);

    jest.useRealTimers();
});
