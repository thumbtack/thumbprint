import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import { hasAnyPastDays, hasAnyFutureDays, validateProps, normaliseValue } from './utilities';

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
    });
});
