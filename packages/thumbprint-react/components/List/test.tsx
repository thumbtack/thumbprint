import React from 'react';
import { mount } from 'enzyme';
import { List, ListItem } from './index';

test('renders content that is passed in', () => {
    const wrapper = mount(<List>goose</List>);
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});

test('renders ul for bullet theme', () => {
    const wrapper = mount(<List theme="bullet">goose</List>);
    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});

test('renders ol for decimal theme', () => {
    const wrapper = mount(<List theme="decimal">goose</List>);
    expect(wrapper.find('ol')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});

test('renders ol for alpha theme', () => {
    const wrapper = mount(<List theme="alpha">goose</List>);
    expect(wrapper.find('ol')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});

test('item renders content that is passed in', () => {
    const wrapper = mount(<ListItem>goose</ListItem>);
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});
