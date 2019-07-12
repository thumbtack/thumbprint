import React, { useState } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import useFocusTrap from './use-focus-trap';

const TAB_KEY = 9;
const A_KEY = 65;

jest.useFakeTimers();

function FocusableThing() {
    const [value, setValue] = useState('');
    const [wrapperEl, setWrapperEl] = useState(null);
    useFocusTrap(wrapperEl, !!wrapperEl);

    return (
        <div ref={el => setWrapperEl(el)} tabIndex="-1">
            <input
                type="text"
                tabIndex="0"
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    );
}

describe('useFocusTrap', () => {
    it('does not trigger a re-render when typing in an input', () => {
        const container = mount(<FocusableThing />);

        act(() => {
            jest.runAllTimers();
        });
        container.update();

        const wrapper = container.find('div');
        let input = container.find('input');

        // When we mount, focus trap defaults to focusing the wrapper
        expect(wrapper.is(':focus')).toBe(true);
        expect(input.is(':focus')).toBe(false);

        // Press Tab to switch focus to the input
        act(() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: TAB_KEY }));
            input.simulate('click');
            // jest.runAllTimers();
        });

        // container.update();
        console.log(document.activeElement.tagName);
        expect(input.getDOMNode()).toBe(document.activeElement);
        expect(input.getDOMNode().value).toBe('');

        // Type a letter
        act(() => {
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: A_KEY }));
        });
        // input.simulate('keydown', { key: 'a', which: A_KEY });
        input.simulate('change', { target: { value: 'a' } });
        container.update();
        // expect(input.is(':focus')).toBe(true);
        input = container.find('input');
        console.log(container.find('input').html());
        expect(input.getDOMNode().value).toBe('a');

        // Type another letter, make sure it didn't get cleared
        act(() => {
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: A_KEY }));
            input.simulate('change', { target: { value: 'aa' } });
        });
        container.update();
        // expect(input.is(':focus')).toBe(true);
        expect(input.getDOMNode().value).toBe('aa');

        // Type another letter, make sure it didn't get cleared
        act(() => {
            document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: A_KEY }));
            input.simulate('change', { target: { value: 'aaa' } });
        });
        container.update();
        // expect(input.is(':focus')).toBe(true);
        expect(input.getDOMNode().value).toBe('aaa');
    });
});
