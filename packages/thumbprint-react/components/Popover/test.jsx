import React from 'react';
import { mount } from 'enzyme';
import Popover from './index';

test('renders content that is passed in', () => {
    const wrapper = mount(
        <Popover isOpen onCloseClick={() => {}}>
            goose
        </Popover>,
    );
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});
