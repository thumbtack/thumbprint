import React from 'react';
import { mount } from 'enzyme';
import FormNote from './index';

test('renders form note text', () => {
    const wrapper = mount(<FormNote>Goose</FormNote>);
    expect(wrapper.text()).toBe('Goose');
    expect(wrapper).toMatchSnapshot();
});

test('renders form note with error', () => {
    const wrapper = mount(<FormNote hasError>Goose</FormNote>);
    expect(wrapper).toMatchSnapshot();
});
