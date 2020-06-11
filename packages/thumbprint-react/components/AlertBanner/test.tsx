import React from 'react';
import { mount } from 'enzyme';
import forEach from 'lodash/forEach';
import AlertBanner from './index';
import { BlockedFilled, InfoFilled, WarningFilled } from '../../icons';

describe('AlertBanner', () => {
    const children = (
        <div data-test="child">
            This is the child component.
            <a href="/">Click here</a>
        </div>
    );
    const cautionWrapper = mount(
        <AlertBanner theme="caution" dataTest="test">
            {children}
        </AlertBanner>,
    );
    const infoWrapper = mount(
        <AlertBanner theme="info" dataTest="test">
            {children}
        </AlertBanner>,
    );
    const warningWrapper = mount(
        <AlertBanner theme="warning" dataTest="test">
            {children}
        </AlertBanner>,
    );
    const testCases = [cautionWrapper, infoWrapper, warningWrapper];

    test('renders appropriate icons', () => {
        expect(cautionWrapper.find(WarningFilled).length).toBe(1);
        expect(infoWrapper.find(InfoFilled).length).toBe(1);
        expect(warningWrapper.find(BlockedFilled).length).toBe(1);

        expect(cautionWrapper.find('.root.caution').length).toBe(1);
        expect(infoWrapper.find('.root.info').length).toBe(1);
        expect(warningWrapper.find('.root.warning').length).toBe(1);

        forEach(testCases, wrapper => {
            expect(wrapper.find('svg').hasClass('icon')).toBe(true);
        });
    });

    test('renders appropriate text and background color based on theme', () => {
        expect(cautionWrapper.find('.root.caution').length).toBe(1);
        expect(infoWrapper.find('.root.info').length).toBe(1);
        expect(warningWrapper.find('.root.warning').length).toBe(1);
    });

    test('renders children', () => {
        expect(cautionWrapper.find('[data-test="child"]').length).toBe(1);
    });

    test('appends data-test attribute to root', () => {
        expect(cautionWrapper.find('[data-test="test"]').hasClass('root')).toBe(true);
    });

    test('match snapshot', () => {
        forEach(testCases, wrapper => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
