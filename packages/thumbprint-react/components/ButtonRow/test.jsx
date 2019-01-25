import React from 'react';
import { mount } from 'enzyme';
import ButtonRow from './index';

test('renders content that is passed in', () => {
    const wrapper = mount(<ButtonRow>goose</ButtonRow>);
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});

describe('placement', () => {
    test('default (left)', () => {
        const wrapper = mount(<ButtonRow justify="left" />);
        expect(wrapper).toMatchSnapshot();
    });

    test('center', () => {
        const wrapper = mount(<ButtonRow justify="center" />);
        expect(wrapper).toMatchSnapshot();
    });

    test('right', () => {
        const wrapper = mount(<ButtonRow justify="right" />);
        expect(wrapper).toMatchSnapshot();
    });
});

test('adds `dataTest` prop', () => {
    const wrapper = mount(<ButtonRow dataTest="Duck" />);
    expect(wrapper.find('div').prop('data-test')).toEqual('Duck');
    expect(wrapper).toMatchSnapshot();
});
