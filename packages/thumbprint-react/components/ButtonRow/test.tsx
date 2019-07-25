import React from 'react';
import { mount } from 'enzyme';
import ButtonRow from './index';

test('renders content that is passed in', (): void => {
    const wrapper = mount(<ButtonRow>goose</ButtonRow>);
    expect(wrapper.text()).toBe('goose');
    expect(wrapper).toMatchSnapshot();
});

describe('placement', (): void => {
    test('default (left)', (): void => {
        const wrapper = mount(<ButtonRow justify="left" />);
        expect(wrapper).toMatchSnapshot();
    });

    test('center', (): void => {
        const wrapper = mount(<ButtonRow justify="center" />);
        expect(wrapper).toMatchSnapshot();
    });

    test('right', (): void => {
        const wrapper = mount(<ButtonRow justify="right" />);
        expect(wrapper).toMatchSnapshot();
    });
});

test('adds `dataTest` prop', (): void => {
    const wrapper = mount(<ButtonRow dataTest="Duck" />);
    expect(wrapper.find('div').prop('data-test')).toEqual('Duck');
    expect(wrapper).toMatchSnapshot();
});
