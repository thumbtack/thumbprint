import React from 'react';
import { mount } from 'enzyme';
import { BlockList, BlockListItem, BlockListItemLink } from './index';

describe('BlockList', () => {
    test('renders content that is passed in', () => {
        const wrapper = mount(<BlockList>goose</BlockList>);
        expect(wrapper.text()).toBe('goose');
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
            <BlockListItemLink href="https://thumbtack.com">goose</BlockListItemLink>,
        );
        expect(wrapper.text()).toBe('goose');
        expect(wrapper).toMatchSnapshot();
    });
    test('renders a class that is passed in', () => {
        const wrapper = mount(
            <BlockListItemLink href="https://thumbtack.com" className="red">
                goose
            </BlockListItemLink>,
        );
        expect(wrapper.find('a').hasClass('red')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders a link', () => {
        const wrapper = mount(
            <BlockListItemLink href="https://thumbtack.com">goose</BlockListItemLink>,
        );
        expect(wrapper.find('a').prop('href')).toBe('https://thumbtack.com');
        expect(wrapper).toMatchSnapshot();
    });
    test('forwards custom props', () => {
        const wrapper = mount(
            <BlockListItemLink href="https://thumbtack.com" target="_blank">
                goose
            </BlockListItemLink>,
        );
        expect(wrapper.find('a').prop('target')).toBe('_blank');
        expect(wrapper).toMatchSnapshot();
    });
});
