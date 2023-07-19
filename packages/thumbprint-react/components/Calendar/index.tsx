import React from 'react';
import { DayPicker, isDateAfterType, isDateBeforeType, Matcher, Modifier } from 'react-day-picker';
import some from 'lodash/some';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import castArray from 'lodash/castArray';
import { endOfDay, isAfter, isBefore, isSameDay, startOfDay } from 'date-fns';
import styles from './index.module.scss';

export type DateIsh = Date | string | number;

function throwError(message: string): void {
    throw new Error(`TUI DatePicker: ${message}`);
}

export function normaliseValue(value: CalendarProps['value']): Date[] {
    if (!value) {
        return [];
    }

    if (!isArray(value)) {
        return [new Date(value)];
    }

    return map(value, d => new Date(d));
}

// Returns true any of the given `dates` fall on a day before the day of `cutoff`.
export function hasAnyPastDays(dates: Date[], cutoff: Date = new Date()): boolean {
    return some(dates, date => isBefore(endOfDay(date), cutoff));
}

// Returns true any of the given `dates` fall on a day after the day of `cutoff`.
export function hasAnyFutureDays(dates: Date[], cutoff: Date = new Date()): boolean {
    return some(dates, date => isAfter(startOfDay(date), cutoff));
}

export function validateProps(props: CalendarProps): void {
    const days = normaliseValue(props.value);

    if (!props.allowMultiSelection && days.length > 1) {
        throwError('`allowMultiSelection` is `false` but multiple dates were provided');
    }

    const disabledDays = castArray(props.disabledDays);

    /* eslint-disable lodash/prefer-lodash-method */
    disabledDays.forEach(modifier => {
        if (isDateBeforeType(modifier) && hasAnyPastDays(days, modifier.before)) {
            throwError(
                `Days before ${modifier.before} are disabled but one or more provided days fall before that.`,
            );
        }
    });

    disabledDays.forEach(modifier => {
        if (isDateAfterType(modifier) && hasAnyFutureDays(days, modifier.after)) {
            throwError(
                `Days after ${modifier.after} are disabled but one or more provided days fall after that.`,
            );
        }
    });
}

export interface CalendarProps {
    /**
     * One or more dates to show as selected in the initial UI. Each "date" can be a JS Date object
     * or a string representing a date, or a numeric UNIX timestamp, and either a single object or
     * an array of such objects can be provided.
     */
    value?: DateIsh | DateIsh[] | null;
    /**
     * Date object representing the month that is currently displayed by the calendar. If omitted
     * it will default to the first date in the `value` prop. You should update it in response to
     * the `onMonthChange` prop.
     */
    month?: Date;
    /**
     * Callback that is triggered when th user selects a date. The function receives an array of
     * a JavaScript Date objects for each of the currently selected dates.
     */
    onChange: (selectedDates: Date[]) => void;
    /**
     * Callback that is triggered when the user navigates to a different month using the navigation
     * buttons or keyboard. The function receives a single JavaScript `Date` object indicating
     * the new on-screen month.
     */
    onMonthChange: (selectedMonth: Date) => void;
    /**
     * Boolean that determines whether or not the user is allowed to select more than one date at
     * a time. Defaults to `false`.
     */
    allowMultiSelection?: boolean;
    /**
     * A react-day-picker modifier for greater control over disabled days. Past selection is
     * disabled by default.
     * See: https://react-day-picker.js.org/api/types/Matcher
     */
    disabledDays?: Matcher | Matcher[] | null;
    /**
     * A Date object representing the last allowed month. Users won’t be able to navigate or
     * interact with the days after it.
     */
    lastMonth?: Date;
    /**
     * Applies a blue dot indicator below the numeric day in the calendar's day cell if the
     * function returns `true` for a given JavaScript `Date`.
     */
    daysThemeDotIndicator?: (date: Date) => boolean;
    /**
     * Applies a strikeout treatment on the numeric day in the calendar's day cell if the function
     * returns `true` for a given JavaScript `Date`.
     */
    daysThemeStrikeout?: (date: Date) => boolean;
}

/**
 * Thin wrapper around `react-day-picker` that renders a calendar.
 */
export default function Calendar({
    value = [],
    onChange,
    onMonthChange,
    disabledDays = { before: new Date() },
    month,
    lastMonth,
    allowMultiSelection = false,
    daysThemeDotIndicator,
    daysThemeStrikeout,
}: CalendarProps): JSX.Element {
    validateProps({
        value,
        onChange,
        disabledDays,
        month,
        lastMonth,
        allowMultiSelection,
        onMonthChange,
        daysThemeDotIndicator,
        daysThemeStrikeout,
    });

    const selectedDays = normaliseValue(value);

    const modifiers: Record<string, Matcher> = {};
    const modifiersClassNames: Record<Modifier, string> = {};

    if (typeof daysThemeDotIndicator === 'function') {
        modifiers['theme-dot'] = daysThemeDotIndicator;
        modifiersClassNames['theme-dot'] = 'rdp-day--theme-dot';
    }

    if (typeof daysThemeStrikeout === 'function') {
        modifiers['theme-strikeout'] = daysThemeStrikeout;
        modifiersClassNames['theme-strikeout'] = 'rdp-day--theme-strikeout';
    }

    return (
        <div className={styles.root}>
            <DayPicker
                disabled={disabledDays || undefined}
                fromMonth={get(disabledDays, 'before', null)}
                toMonth={lastMonth}
                month={
                    month ||
                    (selectedDays && selectedDays.length > 0 ? selectedDays[0] : new Date())
                }
                selected={selectedDays}
                onMonthChange={onMonthChange}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                onDayClick={(day, { selected }): void => {
                    let newSelectedDays = normaliseValue(value);

                    if (allowMultiSelection) {
                        if (selected) {
                            const selectedIndex = findIndex(newSelectedDays, selectedDay =>
                                isSameDay(selectedDay, day),
                            );
                            newSelectedDays.splice(selectedIndex, 1);
                        } else {
                            newSelectedDays.push(day);
                        }
                    } else {
                        newSelectedDays = [day];
                    }

                    onChange(map(newSelectedDays, startOfDay));
                }}
            />
        </div>
    );
}
