import React from 'react';
import { mount } from 'enzyme';
import { BlockList, BlockListItem, BlockListItemLink } from './index';

describe('BlockList', () => {
    test('renders content that is passed in', () => {
        const wrapper = mount(<BlockList>goose</BlockList>);
        expect(wrapper.text()).toBe('goose');
        expect(wrapper).toMatchSnapshot();
    });
    test('renders no left/right padding for list items', () => {
        const wrapper = mount(
            <BlockList flush>
                <BlockListItem>goose</BlockListItem>
            </BlockList>,
        );
        expect(wrapper).toMatchSnapshot();
    });
    test('renders a bottom border on the list', () => {
        const wrapper = mount(<BlockList border="bottom">goose</BlockList>);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders a border around list', () => {
        const wrapper = mount(<BlockList border="group">goose</BlockList>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('BlockListItem', () => {
    test('renders content that is passed in', () => {
        const wrapper = mount(<BlockListItem>goose</BlockListItem>);
        expect(wrapper.text()).toBe('goose');
        expect(wrapper).toMatchSnapshot();
    });
});

describe('BlockListItemLink', () => {
    test('renders content that is passed in', () => {
        const wrapper = mount(
            <BlockListItemLink to="https://thumbtack.com">goose</BlockListItemLink>,
        );
        expect(wrapper.text()).toBe('goose');
        expect(wrapper).toMatchSnapshot();
    });
    test('renders a link', () => {
        const wrapper = mount(
            <BlockListItemLink to="https://thumbtack.com">goose</BlockListItemLink>,
        );
        expect(wrapper.find('a').prop('href')).toBe('https://thumbtack.com');
        expect(wrapper).toMatchSnapshot();
    });
});
