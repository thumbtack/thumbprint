import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';
import Carousel from './index';

describe('Carousel', () => {
    test('renders a carousel', () => {
        const wrapper = mount(
            <Carousel selectedIndex={0} onSelectedIndexChange={noop}>
                gooose
            </Carousel>,
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('does not render duplicate children when not animating', () => {
        const wrapper = mount(
            <Carousel selectedIndex={0} onSelectedIndexChange={noop}>
                <div data-test="item">Goose</div>
            </Carousel>,
        );

        expect(wrapper.find('[data-test="item"]')).toHaveLength(1);
    });

    describe('`selectedIndex`', () => {
        test('supports decimal `selectedIndex` values', () => {
            const wrapper = mount(
                <Carousel selectedIndex={2.3} onSelectedIndexChange={noop}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </Carousel>,
            );
            expect(wrapper).toMatchSnapshot();
        });

        test('supports negative `selectedIndex`', () => {
            const wrapper = mount(
                <Carousel selectedIndex={-0.8} onSelectedIndexChange={noop}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </Carousel>,
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('`visibleCount`', () => {
        test('one visible item', () => {
            const wrapper = mount(
                <Carousel selectedIndex={0} visibleCount={1} onSelectedIndexChange={noop}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </Carousel>,
            );
            expect(wrapper).toMatchSnapshot();
        });

        test('one and a half visible items', () => {
            const wrapper = mount(
                <Carousel selectedIndex={0} visibleCount={1.5} onSelectedIndexChange={noop}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </Carousel>,
            );
            expect(wrapper).toMatchSnapshot();
        });

        test('three visible items', () => {
            const wrapper = mount(
                <Carousel selectedIndex={0} visibleCount={3} onSelectedIndexChange={noop}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </Carousel>,
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('`spacing`', () => {
        test('no spacing', () => {
            const wrapper = mount(
                <Carousel selectedIndex={0} spacing="0px" onSelectedIndexChange={noop}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </Carousel>,
            );
            expect(wrapper).toMatchSnapshot();
        });

        test('spacing in pixels', () => {
            const wrapper = mount(
                <Carousel selectedIndex={0} spacing="10px" onSelectedIndexChange={noop}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </Carousel>,
            );
            expect(wrapper).toMatchSnapshot();
        });

        test('spacing in ems', () => {
            const wrapper = mount(
                <Carousel selectedIndex={0} spacing="2em" onSelectedIndexChange={noop}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </Carousel>,
            );
            expect(wrapper).toMatchSnapshot();
        });
    });
});
