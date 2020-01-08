import React from 'react';
import { mount } from 'enzyme';
import HorizontalRule from './index';

test('renders default horizontal rule', () => {
    const wrapper = mount(<HorizontalRule />);
    expect(wrapper).toMatchSnapshot();
});

test('renders dotted horizontal rule', () => {
    const wrapper = mount(<HorizontalRule lineStyle="dashed" />);
    expect(wrapper).toMatchSnapshot();
});

test('renders gray-300 horizontal rule', () => {
    const wrapper = mount(<HorizontalRule color="gray-300" />);
    expect(wrapper).toMatchSnapshot();
});
