import React from 'react';
import { mount } from 'enzyme';
import ProgressBarBase from './index';

test('updates CSS transform based on `width`', () => {
    const wrapperA = mount(<ProgressBarBase width={33} />);
    expect(wrapperA).toMatchSnapshot();

    const wrapperB = mount(<ProgressBarBase width={50} />);
    expect(wrapperB).toMatchSnapshot();
});

test('updates `aria-valuenow` as `width` changes', () => {
    const wrapperA = mount(<ProgressBarBase width={33} />);
    const progressbarA = wrapperA.find('.inner');
    expect(progressbarA.prop('aria-valuenow')).toBe(33);
    expect(wrapperA).toMatchSnapshot();

    const wrapperB = mount(<ProgressBarBase width={50} />);
    const progressbarB = wrapperB.find('.inner');
    expect(progressbarB.prop('aria-valuenow')).toBe(50);
    expect(wrapperB).toMatchSnapshot();
});
