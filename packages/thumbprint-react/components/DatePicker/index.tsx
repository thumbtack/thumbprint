import React from 'react';
import DayPicker, { DateUtils, Modifiers } from 'react-day-picker';

import get from 'lodash/get';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import startOfDay from 'date-fns/start_of_day';

import styles from './index.module.scss';

import { validateProps, normaliseValue } from './utilities';

import { PropTypes } from './types';

/**
 * Thin wrapper around `react-day-picker` that renders a calendar.
 */
export default function DatePicker({
    value = [],
    onChange,
    onMonthChange,
    disabledDays = { before: new Date() },
    month,
    lastMonth,
    allowMultiSelection = false,
    daysThemeDotIndicator,
    daysThemeStrikeout,
}: PropTypes): JSX.Element {
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
}
