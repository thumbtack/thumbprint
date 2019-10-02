import React from 'react';
import { mount } from 'enzyme';
import { Title, Text } from './index';

describe('Title', () => {
    test('renders content that is passed in', () => {
        const wrapper = mount(<Title size={1}>goose</Title>);
        expect(wrapper.text()).toBe('goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('allows size to be customised', () => {
        const wrapper = mount(<Title size={2}>goose</Title>);
        expect(wrapper.find('div').hasClass('title2')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    test('renders a div by default', () => {
        const wrapper = mount(<Title size={1}>goose</Title>);
        expect(wrapper.find('div')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    test('supports `className`', () => {
        const wrapper = mount(
            <Title size={1} className="white black blue">
                goose
            </Title>,
        );
        expect(wrapper.find('div').hasClass('white black blue')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    test('supports different heading levels', () => {
        const wrapper = mount(
            <Title size={1} headingLevel={6}>
                goose
            </Title>,
        );
        expect(wrapper.find('h6')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    test('supports `dataTest` prop', () => {
        const wrapper = mount(
            <Title dataTest="Duck" headingLevel={1} size={1}>
                Goose
            </Title>,
        );
        expect(wrapper.find('h1').prop('data-test')).toEqual('Duck');
        expect(wrapper).toMatchSnapshot();
    });

    test('supports `id` prop', () => {
        const wrapper = mount(
            <Title id="Duck" headingLevel={1} size={1}>
                Goose
            </Title>,
        );
        expect(wrapper.find('h1').prop('id')).toEqual('Duck');
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Text', () => {
    test('renders content that is passed in', () => {
        const wrapper = mount(<Text>goose</Text>);
        expect(wrapper.text()).toBe('goose');
        expect(wrapper).toMatchSnapshot();
    });

    test('renders a paragraph by default', () => {
        const wrapper = mount(<Text>goose</Text>);
        expect(wrapper.find('p')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    test('allows size to be customised', () => {
        const wrapper = mount(<Text size={2}>goose</Text>);
        expect(wrapper.find('p').hasClass('text2')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    test('supports `className`', () => {
        const wrapper = mount(<Text className="white black blue">goose</Text>);
        expect(wrapper.find('p').hasClass('white black blue')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    test('can render a span', () => {
        const wrapper = mount(<Text elementName="span">goose</Text>);
        expect(wrapper.find('span')).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    test('supports `dataTest` prop', () => {
        const wrapper = mount(
            <Text dataTest="Duck" size={1}>
                Goose
            </Text>,
        );
        expect(wrapper.find('p').prop('data-test')).toEqual('Duck');
        expect(wrapper).toMatchSnapshot();
    });
});
