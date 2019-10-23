import React from 'react';
import { mount } from 'enzyme';
import { BannerAlert, InPageAlert } from './index';

describe('BannerAlert', () => {
    test('renders children', () => {
        const wrapper = mount(
            <BannerAlert>
                <p data-test-id="text">Alert content</p>
            </BannerAlert>,
        );
        expect(wrapper.find('[data-test-id="text"]').text()).toBe('Alert content');
        expect(wrapper).toMatchSnapshot();
    });
});

describe('InPageAlert', () => {
    test('renders icon', () => {
        const wrapper = mount(
            <InPageAlert>
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(wrapper.find('svg').hasClass('icon')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders children', () => {
        const wrapper = mount(
            <InPageAlert>
                <p data-test-id="text">Alert content</p>
            </InPageAlert>,
        );
        expect(wrapper.find('[data-test-id="text"]').text()).toBe('Alert content');
        expect(wrapper).toMatchSnapshot();
    });
});
