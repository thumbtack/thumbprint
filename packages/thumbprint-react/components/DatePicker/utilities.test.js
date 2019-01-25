import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';
import { hasAnyPastDays, validateProps } from './utilities';

test('correctly determines whether a list of dates contains any on past days', () => {
    // Anything on a past day should be detected, regardless of time
    expect(hasAnyPastDays([subDays(new Date(), 10)])).toBe(true);

    // Times earlier in the same day should not be detected
    expect(
        hasAnyPastDays(
            [new Date('Tue Sep 16 2017 14:00:00 GMT+0100 (BST)')],
            new Date('Tue Sep 16 2017 15:00:00 GMT+0100 (BST)'),
        ),
    ).toBe(false);

    // The current time should not be detected
    expect(hasAnyPastDays([new Date()])).toBe(false);

    // Days in the future should not be detected
    expect(hasAnyPastDays([addDays(new Date(), 10)])).toBe(false);
});

test('throws an error when multiple selection is disabled and multiple initial dates are provided', () => {
    expect(() => {
        validateProps({
            allowMultiSelection: false,
            value: [new Date(), addDays(new Date(), 1)],
        });
    }).toThrow('TUI DatePicker: `allowMultiSelection` is `false` but multiple dates were provided');
});

test('throws an error when past selection is disabled and one or more initial dates are in the past', () => {
    expect(() => {
        validateProps({
            allowMultiSelection: true,
            disabledDays: { before: new Date() },
            value: [new Date(), subDays(new Date(), 1)],
        });
    }).toThrow(
        'TUI DatePicker: Past selection is disabled but one or more provided dates are in the past',
    );
});
