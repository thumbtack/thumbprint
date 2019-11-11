import React from 'react';
import { mount } from 'enzyme';
import Input from '../Input/index';
import Button from '../Button/index';
import InputRow from './index';

test('renders all children', () => {
    const wrapper = mount(
        <InputRow>
            <button type="button" />
            <button type="button" />
            <button type="button" />
        </InputRow>,
    );
    expect(wrapper.find('button')).toHaveLength(3);
    expect(wrapper).toMatchSnapshot();
});

test('sets width ratios when they are all numbers', () => {
    const wrapper = mount(
        <InputRow widthRatios={[1, 1, 1]}>
            <button type="button" />
            <button type="button" />
            <button type="button" />
        </InputRow>,
    );
    expect(wrapper).toMatchSnapshot();
});

test('sets width ratios even if some are `null`', () => {
    const wrapper = mount(
        <InputRow widthRatios={[1, null, null]}>
            <button type="button" />
            <button type="button" />
            <button type="button" />
        </InputRow>,
    );
    expect(wrapper).toMatchSnapshot();
});

test('works with `Input` and `Button`', () => {
    // Test out different ordering because the components should behave differently dpeending on
    // their orders. Some components, such as `Button`, set `width: 100%` if they are used within
    // an `InputRow`.
    const wrapperA = mount(
        <InputRow>
            <Input onChange={jest.fn} />
            <Button>Duck</Button>
        </InputRow>,
    );

    const wrapperB = mount(
        <InputRow>
            <Button>Duck</Button>
            <Input onChange={jest.fn} />
        </InputRow>,
    );

    const wrapperC = mount(
        <InputRow>
            <Button>Duck</Button>
            <Input onChange={jest.fn} />
        </InputRow>,
    );

    const wrapperD = mount(
        <InputRow>
            <Input onChange={jest.fn} />
            <Button>Duck</Button>
        </InputRow>,
    );

    expect(wrapperA).toMatchSnapshot();
    expect(wrapperB).toMatchSnapshot();
    expect(wrapperC).toMatchSnapshot();
    expect(wrapperD).toMatchSnapshot();
});

test('adds `dataTest` prop', () => {
    const wrapper = mount(
        <InputRow dataTest="Duck">
            <button type="button" />
            <button type="button" />
            <button type="button" />
        </InputRow>,
    );
    expect(wrapper.find('div[data-test="Duck"]')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});
