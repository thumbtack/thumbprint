import React from 'react';
import { mount } from 'enzyme';
import { BannerAlert, InPageAlert } from './index';

describe('BannerAlert', () => {
    test('renders messageType good', () => {
        const wrapper = mount(
            <BannerAlert messageType="good">
                <p>Alert content</p>
            </BannerAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('goodNews'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders messageType bad', () => {
        const wrapper = mount(
            <BannerAlert messageType="bad">
                <p>Alert content</p>
            </BannerAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('badNews'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders messageType warning', () => {
        const wrapper = mount(
            <BannerAlert messageType="warning">
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
    test('renders messageType note', () => {
        const wrapper = mount(
            <BannerAlert messageType="note">
                <p>Alert content</p>
            </BannerAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('note'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders children', () => {
        const wrapper = mount(
            <BannerAlert messageType="note">
                <p data-test-id="text">Alert content</p>
            </BannerAlert>,
        );
        expect(wrapper.find('[data-test-id="text"]').text()).toBe('Alert content');
        expect(wrapper).toMatchSnapshot();
    });
});

describe('InPageAlert', () => {
    test('renders messageType good', () => {
        const wrapper = mount(
            <InPageAlert messageType="good">
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('goodNews'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders messageType bad', () => {
        const wrapper = mount(
            <InPageAlert messageType="bad">
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('badNews'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders messageType warning', () => {
        const wrapper = mount(
            <InPageAlert messageType="warning">
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
    test('renders messageType note', () => {
        const wrapper = mount(
            <InPageAlert messageType="note">
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(
            wrapper
                .find('div')
                .at(0)
                .hasClass('note'),
        ).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders icon', () => {
        const wrapper = mount(
            <InPageAlert messageType="good">
                <p>Alert content</p>
            </InPageAlert>,
        );
        expect(wrapper.find('svg').hasClass('icon')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('renders children', () => {
        const wrapper = mount(
            <InPageAlert messageType="note">
                <p data-test-id="text">Alert content</p>
            </InPageAlert>,
        );
        expect(wrapper.find('[data-test-id="text"]').text()).toBe('Alert content');
        expect(wrapper).toMatchSnapshot();
    });
});
