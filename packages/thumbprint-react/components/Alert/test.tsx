import React from 'react';
import { mount } from 'enzyme';
import { BannerAlert, InPageAlert } from './index';

describe('BannerAlert', () => {
    test('renders theme good', () => {
        const wrapper = mount(
            <BannerAlert theme="good">
                <p>Alert content</p>
            </BannerAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('good'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders theme bad', () => {
        const wrapper = mount(
            <BannerAlert theme="bad">
                <p>Alert content</p>
            </BannerAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('bad'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders theme warning', () => {
        const wrapper = mount(
            <BannerAlert theme="warning">
                <p>Alert content</p>
            </BannerAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('warning'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders theme info', () => {
        const wrapper = mount(
            <BannerAlert theme="info">
                <p>Alert content</p>
            </BannerAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('info'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders children', () => {
        const wrapper = mount(
            <BannerAlert theme="info">
                <p data-test-id="text">Alert content</p>
            </BannerAlert>,
        );
        expect(wrapper.find('[data-test-id="text"]').text()).toBe('Alert content');
        expect(wrapper).toMatchSnapshot();
    });
});

describe('InPageAlert', () => {
    test('renders theme good', () => {
        const wrapper = mount(
            <InPageAlert theme="good">
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('good'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders theme bad', () => {
        const wrapper = mount(
            <InPageAlert theme="bad">
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('bad'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders theme warning', () => {
        const wrapper = mount(
            <InPageAlert theme="warning">
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('warning'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders theme info', () => {
        const wrapper = mount(
            <InPageAlert theme="info">
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('info'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders icon', () => {
        const wrapper = mount(
            <InPageAlert theme="good">
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(wrapper.find('svg').hasClass('icon')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders children', () => {
        const wrapper = mount(
            <InPageAlert theme="info">
                <p data-test-id="text">Alert content</p>
            </InPageAlert>,
        );
        expect(wrapper.find('[data-test-id="text"]').text()).toBe('Alert content');
        expect(wrapper).toMatchSnapshot();
    });
});
