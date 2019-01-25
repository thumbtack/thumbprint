import React from 'react';
import { mount } from 'enzyme';
import DatePicker from './index';

test('renders a basic date picker with past date selection allowed', () => {
    const wrapper = mount(
        <DatePicker
            disabledDays={null}
            onChange={() => {}}
            value="Tue Sep 16 2017 14:39:00 GMT+0100 (BST)"
        />,
    );
    expect(wrapper).toMatchSnapshot();
});

describe('calls `onChange` with the correct date', () => {
    test('single date selection', () => {
        const onChange = jest.fn();
        // This test will break in 2057. ¯\_(ツ)_/¯
        const value = 'Tue Sep 3 2057 14:39:00 GMT+0100 (BST)';

        const wrapper = mount(<DatePicker onChange={onChange} value={value} />);

        const allDays = wrapper.find('.DayPicker-Day');

        // Click on the 15th first.
        const day15 = allDays.findWhere(n => n.prop('children') === 15);
        day15.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([new Date('2057-09-15T07:00:00.000Z')]);

        // Click on the 22nd next.
        const day22 = allDays.findWhere(n => n.prop('children') === 22);
        day22.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith([new Date('2057-09-22T07:00:00.000Z')]);
    });

    test('multi date selection', () => {
        const onChange = jest.fn();
        const firstDate = new Date('2057-09-03T07:00:00.000Z');
        const secondDate = new Date('2057-09-15T07:00:00.000Z');
        const thirdDate = new Date('2057-09-22T07:00:00.000Z');

        const wrapper = mount(
            <DatePicker onChange={onChange} value={firstDate} allowMultiSelection />,
        );

        const allDays = wrapper.find('.DayPicker-Day');

        // Click on the 15th first.
        const day15 = allDays.findWhere(n => n.prop('children') === 15);
        day15.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([firstDate, secondDate]);

        // Click on the 22nd next.
        const day22 = allDays.findWhere(n => n.prop('children') === 22);
        day22.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith([firstDate, secondDate, thirdDate]);
    });
});

describe('user tries to unselect a date that was already selected', () => {
    test('single date selection does not allow them to unselect a date', () => {
        // Note: This behavior is inconsistent with `allowMultiSelection`. The two should probably
        // be consistent, but, until then, this test enforces the odd behavior.
        const onChange = jest.fn();

        // The 3rd of September is already chosen.
        const firstDate = new Date('2057-09-03T07:00:00.000Z');

        const wrapper = mount(<DatePicker onChange={onChange} value={firstDate} />);

        const allDays = wrapper.find('.DayPicker-Day');

        // Click on the 3rd day.
        const day3 = allDays.findWhere(n => n.prop('children') === 3);
        day3.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([firstDate]);
    });

    test('multi date selection allows them to unselect the date', () => {
        const onChange = jest.fn();

        // The 3rd of September is already chosen.
        const firstDate = new Date('2057-09-03T07:00:00.000Z');

        const wrapper = mount(
            <DatePicker onChange={onChange} value={firstDate} allowMultiSelection />,
        );

        const allDays = wrapper.find('.DayPicker-Day');

        // Click on the 3rd day.
        const day3 = allDays.findWhere(n => n.prop('children') === 3);
        day3.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([]);
    });
});

describe('user tries to click on a disabled date', () => {
    test('single date selection', () => {
        const onChange = jest.fn();

        const selectedDate = new Date('2057-09-03T07:00:00.000Z');
        // The 10th is disabled.
        const disabledDate = new Date('2057-09-10T07:00:00.000Z');

        const wrapper = mount(
            <DatePicker onChange={onChange} value={selectedDate} disabledDays={disabledDate} />,
        );

        const allDays = wrapper.find('.DayPicker-Day');

        // Click on the 10th, the disabled date.
        const day10 = allDays.findWhere(n => n.prop('children') === 10);
        day10.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(0);
    });

    test('multi date selection', () => {
        const onChange = jest.fn();

        const selectedDate = new Date('2057-09-03T07:00:00.000Z');
        // The 10th is disabled.
        const disabledDate = new Date('2057-09-10T07:00:00.000Z');

        const wrapper = mount(
            <DatePicker
                onChange={onChange}
                value={selectedDate}
                disabledDays={disabledDate}
                allowMultiSelection
            />,
        );

        const allDays = wrapper.find('.DayPicker-Day');

        // Click on the 10th, the disabled date.
        const day10 = allDays.findWhere(n => n.prop('children') === 10);
        day10.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(0);
    });
});

describe('user is able to select a date in the past if disabled days is disabled', () => {
    test('single date selection', () => {
        const onChange = jest.fn();

        // We use the year 2000 since these must be days from the past.
        const selectedDate = new Date('2000-09-03T07:00:00.000Z');
        const dateFromPrevMonth = new Date('2000-08-10T07:00:00.000Z');

        const wrapper = mount(
            <DatePicker onChange={onChange} value={selectedDate} disabledDays={null} />,
        );

        // Go back a month.
        const prevMonthButton = wrapper.find('.DayPicker-NavButton--prev');
        prevMonthButton.simulate('click');

        const allDays = wrapper.find('.DayPicker-Day');

        // Click on the 10th, the date from a previous month.
        const day10 = allDays.findWhere(n => n.prop('children') === 10);
        day10.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([dateFromPrevMonth]);
    });

    test('multi date selection', () => {
        const onChange = jest.fn();

        // We use the year 2000 since these must be days from the past.
        const selectedDate = new Date('2000-09-03T07:00:00.000Z');
        const dateFromPrevMonth = new Date('2000-08-10T07:00:00.000Z');

        const wrapper = mount(
            <DatePicker
                onChange={onChange}
                value={selectedDate}
                disabledDays={null}
                allowMultiSelection
            />,
        );

        // Go back a month.
        const prevMonthButton = wrapper.find('.DayPicker-NavButton--prev');
        prevMonthButton.simulate('click');

        const allDays = wrapper.find('.DayPicker-Day');

        // Click on the 10th, the date from a previous month.
        const day10 = allDays.findWhere(n => n.prop('children') === 10);
        day10.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([selectedDate, dateFromPrevMonth]);
    });
});
