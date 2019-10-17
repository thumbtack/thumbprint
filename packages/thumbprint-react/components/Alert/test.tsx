import React from 'react';
import { mount } from 'enzyme';
import { BannerAlert, InPageAlert } from './index';

describe('BannerAlert', () => {
    test('renders messageType that is passed in', () => {
        const wrapper = mount(
            <BannerAlert messageType="good">
                <p>Alert content</p>
            </BannerAlert>,
        );
        expect(wrapper.find('div').hasClass('goodNews')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('InPageAlert', () => {
    test('renders messageType that is passed in', () => {
        const wrapper = mount(
            <InPageAlert messageType="good">
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(wrapper.find('div').hasClass('goodNews')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});
