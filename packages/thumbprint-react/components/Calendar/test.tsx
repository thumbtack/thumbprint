import React, { useState } from 'react';
import { mount } from 'enzyme';
import { addDays, subDays } from 'date-fns';
import Calendar, { validateProps, normaliseValue, hasAnyPastDays, hasAnyFutureDays } from './index';

test('renders a basic calendar with past date selection allowed', () => {
    const wrapper = mount(
        <Calendar
            disabledDays={null}
            onChange={(): void => {}}
            onMonthChange={(): void => {}}
            value="Tue Sep 16 2017 14:39:00 GMT+0100 (BST)"
        />,
    );
    expect(wrapper).toMatchSnapshot();
});

describe('calls `onChange` with the correct date', () => {
    test('single date selection', () => {
        const onChange = jest.fn();
        const onMonthChange = jest.fn();
        // This test will break in 2057. ¯\_(ツ)_/¯
        const value = 'Tue Sep 3 2057 14:39:00 GMT+0100 (BST)';

        const wrapper = mount(
            <Calendar onChange={onChange} onMonthChange={onMonthChange} value={value} />,
        );

        const allDays = wrapper.find('.rdp-day');

        // Click on the 15th first.
        const day15 = allDays
            .findWhere(n => {
                return n.text() === '15';
            })
            .at(0);

        day15.simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([new Date('2057-09-15T07:00:00.000Z')]);

        // Click on the 22nd next.
        const day22 = allDays.findWhere(n => n.text() === '22').at(0);
        day22.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith([new Date('2057-09-22T07:00:00.000Z')]);
    });

    test('multi date selection', () => {
        const onMonthChange = jest.fn();

        // Wrapper component to allow us to write integration tests for a controlled component.
        function DatePickerExample({
            firstDate,
            onChange,
        }: {
            firstDate: Date;
            onChange: (dates: Date[]) => void;
        }): JSX.Element {
            const [value, setValue] = useState<Date[]>([firstDate]);

            return (
                <Calendar
                    value={value}
                    // We need to call these two functions separately here. `onChange` is the
                    // external reference to `jest.fn` that lets us make assertions about how this
                    // function was called. `setValue` is the React Hook that actually updates the
                    // state so we can track changes over the whole integration test.
                    // TODO: maybe extract this out or revisit if this becomes a common pattern
                    onChange={(newValue): void => {
                        onChange(newValue);
                        setValue(newValue);
                    }}
                    onMonthChange={onMonthChange}
                    allowMultiSelection
                />
            );
        }

        const firstDate = new Date('2057-09-03T07:00:00.000Z');
        const secondDate = new Date('2057-09-15T07:00:00.000Z');
        const thirdDate = new Date('2057-09-22T07:00:00.000Z');

        const onChange = jest.fn();

        const wrapper = mount(<DatePickerExample firstDate={firstDate} onChange={onChange} />);

        const allDays = wrapper.find('.rdp-day');

        // Click on the 15th first.
        const day15 = allDays.findWhere(n => n.text() === '15').at(0);
        day15.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([firstDate, secondDate]);

        // Click on the 22nd next.
        const day22 = allDays.findWhere(n => n.text() === '22').at(0);
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
        const onMonthChange = jest.fn();

        // The 3rd of September is already chosen.
        const firstDate = new Date('2057-09-03T07:00:00.000Z');

        const wrapper = mount(
            <Calendar onChange={onChange} onMonthChange={onMonthChange} value={firstDate} />,
        );

        const allDays = wrapper.find('.rdp-day');

        // Click on the 3rd day.
        const day3 = allDays.findWhere(n => n.text() === '3').at(0);
        day3.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([firstDate]);
    });

    test('multi date selection allows them to unselect the date', () => {
        const onChange = jest.fn();
        const onMonthChange = jest.fn();

        // The 3rd of September is already chosen.
        const firstDate = new Date('2057-09-03T07:00:00.000Z');

        const wrapper = mount(
            <Calendar
                onChange={onChange}
                value={firstDate}
                onMonthChange={onMonthChange}
                allowMultiSelection
            />,
        );

        const allDays = wrapper.find('.rdp-day');

        // Click on the 3rd day.
        const day3 = allDays.findWhere(n => n.text() === '3').at(0);
        day3.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([]);
    });
});

describe('user tries to click on a disabled date', () => {
    test('single date selection', () => {
        const onChange = jest.fn();
        const onMonthChange = jest.fn();

        const selectedDate = new Date('2057-09-03T07:00:00.000Z');
        // The 10th is disabled.
        const disabledDate = new Date('2057-09-10T07:00:00.000Z');

        const wrapper = mount(
            <Calendar
                onChange={onChange}
                onMonthChange={onMonthChange}
                value={selectedDate}
                disabledDays={disabledDate}
            />,
        );

        const allDays = wrapper.find('.rdp-day');

        // Click on the 10th, the disabled date.
        const day10 = allDays.findWhere(n => n.text() === '10').at(0);
        day10.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(0);
    });

    test('multi date selection', () => {
        const onChange = jest.fn();
        const onMonthChange = jest.fn();

        const selectedDate = new Date('2057-09-03T07:00:00.000Z');
        // The 10th is disabled.
        const disabledDate = new Date('2057-09-10T07:00:00.000Z');

        const wrapper = mount(
            <Calendar
                onChange={onChange}
                onMonthChange={onMonthChange}
                value={selectedDate}
                disabledDays={disabledDate}
                allowMultiSelection
            />,
        );

        const allDays = wrapper.find('.rdp-day');

        // Click on the 10th, the disabled date.
        const day10 = allDays.findWhere(n => n.text() === '10').at(0);
        day10.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(0);
    });
});

describe('user is able to select a date in the past if disabled days is disabled', () => {
    test('single date selection', () => {
        const onChange = jest.fn();
        const onMonthChange = jest.fn();

        // We use the year 2000 since these must be days from the past.
        const selectedDate = new Date('2000-09-03T07:00:00.000Z');
        const dateFromPrevMonth = new Date('2000-08-10T07:00:00.000Z');

        const wrapper = mount(
            <Calendar
                onChange={onChange}
                onMonthChange={onMonthChange}
                value={selectedDate}
                disabledDays={null}
            />,
        );

        // Go back a month.
        const prevMonthButton = wrapper.find('.rdp-nav_button_previous').at(0);
        prevMonthButton.simulate('click');

        wrapper.setProps({ month: dateFromPrevMonth });

        const allDays = wrapper.find('.rdp-day');

        // Click on the 10th, the date from a previous month.
        const day10 = allDays.findWhere(n => n.text() === '10').at(0);
        day10.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([dateFromPrevMonth]);
    });

    test('multi date selection', () => {
        const onChange = jest.fn();
        const onMonthChange = jest.fn();

        // We use the year 2000 since these must be days from the past.
        const selectedDate = new Date('2000-09-03T07:00:00.000Z');
        const dateFromPrevMonth = new Date('2000-08-10T07:00:00.000Z');

        const wrapper = mount(
            <Calendar
                onChange={onChange}
                onMonthChange={onMonthChange}
                value={selectedDate}
                disabledDays={null}
                allowMultiSelection
            />,
        );

        // Go back a month.
        const prevMonthButton = wrapper.find('.rdp-nav_button_previous').at(0);
        prevMonthButton.simulate('click');
        wrapper.setProps({ month: dateFromPrevMonth });

        const allDays = wrapper.find('.rdp-day');

        // Click on the 10th, the date from a previous month.
        const day10 = allDays.findWhere(n => n.text() === '10').at(0);
        day10.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith([selectedDate, dateFromPrevMonth]);
    });
});

describe('`onMonthChange` callback should be called on month change', () => {
    const onChange = (): void => {};
    const year = 2057;
    const month = 9;
    const selectedDate = new Date(year, month);

    test('when next month is clicked', () => {
        const onMonthChange = jest.fn();
        const wrapper = mount(
            <Calendar value={selectedDate} onChange={onChange} onMonthChange={onMonthChange} />,
        );

        const nextMonthButton = wrapper.find('.rdp-nav_button_next').at(0);
        nextMonthButton.simulate('click');

        expect(onMonthChange).toHaveBeenCalledTimes(1);
        const newMonth = onMonthChange.mock.calls[0][0];
        expect(newMonth.getFullYear()).toBe(year);
        expect(newMonth.getMonth()).toBe(month + 1);
    });

    test('when previous month is clicked', () => {
        const onMonthChange = jest.fn();
        const wrapper = mount(
            <Calendar value={selectedDate} onChange={onChange} onMonthChange={onMonthChange} />,
        );

        const prevMonthButton = wrapper.find('.rdp-nav_button_previous').at(0);
        prevMonthButton.simulate('click');

        expect(onMonthChange).toHaveBeenCalledTimes(1);
        const newMonth = onMonthChange.mock.calls[0][0];
        expect(newMonth.getFullYear()).toBe(year);
        expect(newMonth.getMonth()).toBe(month - 1);
    });
});

describe('applying themes to Calendar day cells', () => {
    const modifierPrefix = '.rdp-day--';
    const onChange = (): void => {};
    const onMonthChange = jest.fn();
    const year = 2057;
    const month = 8;
    const day = 3;
    const selectedDate = new Date(year, month, day);

    const areDatesEqual = (calDate: Date, expectedDate: Date): boolean =>
        calDate.getFullYear() === expectedDate.getFullYear() &&
        calDate.getMonth() === expectedDate.getMonth() &&
        calDate.getDate() === expectedDate.getDate();

    test('`daysThemeDotIndicator` applies modifier styles for dot indicators', () => {
        const testDay1 = 5;
        const testDay2 = 16;
        const jsDate1 = new Date(year, month, testDay1);
        const jsDate2 = new Date(year, month, testDay2);

        const wrapper = mount(
            <Calendar
                value={selectedDate}
                onChange={onChange}
                onMonthChange={onMonthChange}
                daysThemeDotIndicator={(calDate: Date): boolean =>
                    areDatesEqual(calDate, jsDate1) || areDatesEqual(calDate, jsDate2)
                }
            />,
        );

        const modifiedDays = wrapper.find(`${modifierPrefix}theme-dot`).hostNodes();
        expect(modifiedDays).toHaveLength(2);
        expect(modifiedDays.at(0).text()).toEqual(String(testDay1));
        expect(modifiedDays.at(1).text()).toEqual(String(testDay2));
    });

    test('`daysThemeStrikeout` applies modifier styles for strikeout', () => {
        const testDay1 = 2;
        const testDay2 = 12;
        const testDay3 = 22;
        const jsDate1 = new Date(year, month, testDay1);
        const jsDate2 = new Date(year, month, testDay2);
        const jsDate3 = new Date(year, month, testDay3);

        const wrapper = mount(
            <Calendar
                value={selectedDate}
                onChange={onChange}
                onMonthChange={onMonthChange}
                daysThemeStrikeout={(calDate: Date): boolean =>
                    areDatesEqual(calDate, jsDate1) ||
                    areDatesEqual(calDate, jsDate2) ||
                    areDatesEqual(calDate, jsDate3)
                }
            />,
        );

        const modifiedDays = wrapper.find(`${modifierPrefix}theme-strikeout`).hostNodes();
        expect(modifiedDays).toHaveLength(3);
        expect(modifiedDays.at(0).text()).toEqual(String(testDay1));
        expect(modifiedDays.at(1).text()).toEqual(String(testDay2));
        expect(modifiedDays.at(2).text()).toEqual(String(testDay3));
    });
});

describe('DatePicker utilities', () => {
    describe('normaliseValue', () => {
        test('converts a single item to an array', () => {
            const date = new Date('Tue Sep 16 2017 15:00:00 GMT+0100 (BST)');
            expect(normaliseValue(date)).toEqual([date]);
        });

        test('converts strings and numbers to `Date`s', () => {
            const dates = [
                new Date('Tue Sep 16 2017 15:00:00 GMT+0100 (BST)'),
                'Wed Sep 17 2017 15:00:00 GMT+0100 (BST)',
                1505570400000,
            ];
            expect(normaliseValue(dates)).toEqual([
                new Date('2017-09-16T14:00:00.000Z'),
                new Date('2017-09-17T14:00:00.000Z'),
                new Date('2017-09-16T14:00:00.000Z'),
            ]);
        });
    });

    describe('hasAnyPastDays', () => {
        test('returns false an empty list of days', () => {
            expect(hasAnyPastDays([])).toBe(false);
        });

        test('returns true for any days before the current day, regardless of time of day', () => {
            expect(hasAnyPastDays([subDays(new Date(), 10)])).toBe(true);
        });

        test('returns false for dates that are on the same day as the specified target date, but at an earlier time', () => {
            const targetDate = new Date('Tue Sep 16 2017 15:00:00 GMT+0100 (BST)');
            const earlierThatDay = new Date('Tue Sep 16 2017 14:00:00 GMT+0100 (BST)');

            expect(hasAnyPastDays([earlierThatDay], targetDate)).toBe(false);
        });

        test('returns false for the exact current date', () => {
            expect(hasAnyPastDays([new Date()])).toBe(false);
        });

        test('returns false for dates that are all in the future', () => {
            expect(hasAnyPastDays([addDays(new Date(), 10), addDays(new Date(), 11)])).toBe(false);
        });
    });

    describe('hasAnyFutureDays', () => {
        test('returns false an empty list of days', () => {
            expect(hasAnyFutureDays([])).toBe(false);
        });

        test('returns true for any days after the current day, regardless of time of day', () => {
            expect(hasAnyFutureDays([addDays(new Date(), 10)])).toBe(true);
        });

        test('returns false for dates that are on the same day as the specified target date, but at a later time', () => {
            const targetDate = new Date('Tue Sep 16 2017 15:00:00 GMT+0100 (BST)');
            const laterThatDay = new Date('Tue Sep 16 2017 16:00:00 GMT+0100 (BST)');

            expect(hasAnyFutureDays([laterThatDay], targetDate)).toBe(false);
        });

        test('returns false for the exact current date', () => {
            expect(hasAnyFutureDays([new Date()])).toBe(false);
        });

        test('returns false for dates that are all in the past', () => {
            expect(hasAnyFutureDays([subDays(new Date(), 10), subDays(new Date(), 11)])).toBe(
                false,
            );
        });
    });

    describe('validateProps', () => {
        test('throws an error when multiple selection is disabled and multiple initial dates are provided', () => {
            expect(() => {
                validateProps({
                    onChange: (): void => {},
                    onMonthChange: (): void => {},
                    allowMultiSelection: false,
                    value: [new Date(), addDays(new Date(), 1)],
                });
            }).toThrow(
                'TUI DatePicker: `allowMultiSelection` is `false` but multiple dates were provided',
            );
        });

        test('throws an error when past selection is disabled and one or more initial dates are in the past', () => {
            expect(() => {
                validateProps({
                    onChange: (): void => {},
                    onMonthChange: (): void => {},
                    allowMultiSelection: true,
                    disabledDays: { before: new Date() },
                    value: [new Date(), subDays(new Date(), 1)],
                });
            }).toThrow('are disabled but one or more provided days fall before that');
        });

        test('throws an error when future selection is disabled and one or more initial dates are in the future', () => {
            expect(() => {
                validateProps({
                    onChange: (): void => {},
                    onMonthChange: (): void => {},
                    allowMultiSelection: true,
                    disabledDays: { after: new Date() },
                    value: [addDays(new Date(), 1), addDays(new Date(), 2)],
                });
            }).toThrow('are disabled but one or more provided days fall after that');
        });

        test('does not throw an error when past and future selection are disabled, and the initial date is `null`', () => {
            expect(() => {
                validateProps({
                    onChange: (): void => {},
                    onMonthChange: (): void => {},
                    allowMultiSelection: true,
                    disabledDays: { before: subDays(new Date(), 5), after: addDays(new Date(), 5) },
                    value: null,
                });
            }).not.toThrow();
        });

        test('does not throw an error when past and future selection are disabled, and the initial date is `undefined`', () => {
            expect(() => {
                validateProps({
                    onChange: (): void => {},
                    onMonthChange: (): void => {},
                    allowMultiSelection: true,
                    disabledDays: { before: subDays(new Date(), 5), after: addDays(new Date(), 5) },
                    value: undefined,
                });
            }).not.toThrow();
        });
    });
});
