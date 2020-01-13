import React from 'react';
import DayPicker, { DateUtils, Modifiers, Modifier } from 'react-day-picker';

import get from 'lodash/get';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import startOfDay from 'date-fns/start_of_day';

import styles from './index.module.scss';

import { validateProps, normaliseValue } from './utilities';

import { DateIsh } from './types';

interface PropTypes {
    /**
     * One or more dates to show as selected in the initial UI. Each "date" can be a JS Date object
     * or a string representing a date, or a numeric UNIX timestamp, and either a single object or
     * an array of such objects can be provided.
     */
    value?: DateIsh | DateIsh[];
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
     * http://react-day-picker.js.org/docs/modifiers.html
     */
    disabledDays?: Modifier;
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
const Calendar = ({
    value = [],
    onChange,
    onMonthChange,
    disabledDays = { before: new Date() },
    month,
    lastMonth,
    allowMultiSelection = false,
    daysThemeDotIndicator,
    daysThemeStrikeout,
}: PropTypes): JSX.Element => {
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

    const modifiers: Partial<Modifiers> = {};

    if (typeof daysThemeDotIndicator === 'function') {
        modifiers['theme-dot'] = daysThemeDotIndicator;
    }

    if (typeof daysThemeStrikeout === 'function') {
        modifiers['theme-strikeout'] = daysThemeStrikeout;
    }

    return (
        <div className={styles.root}>
            <DayPicker
                disabledDays={disabledDays}
                fromMonth={get(disabledDays, 'before', null)}
                toMonth={lastMonth}
                month={month || selectedDays[0]}
                initialMonth={month || selectedDays[0]}
                selectedDays={selectedDays}
                onMonthChange={onMonthChange}
                modifiers={modifiers}
                onDayClick={(day, { selected, disabled }): void => {
                    if (disabled) {
                        return;
                    }

                    let newSelectedDays = normaliseValue(value);

                    if (allowMultiSelection) {
                        if (selected) {
                            const selectedIndex = findIndex(newSelectedDays, selectedDay =>
                                DateUtils.isSameDay(selectedDay, day),
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
};

export default Calendar;
