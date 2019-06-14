import React from 'react';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils, PropTypes as DayPickerPropTypes } from 'react-day-picker';

import get from 'lodash/get';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';

import styles from './index.module.scss';

import { validateProps, normaliseValue, roundToStartOfDay } from './utilities';

/**
 * Thin wrapper around `react-day-picker` that renders a calendar.
 */
export default function DatePicker(props) {
    validateProps(props);

    const {
        value,
        onChange,
        disabledDays,
        lastMonth,
        allowMultiSelection,
        onMonthChange,
        daysThemeDotIndicator,
        daysThemeStrikeout,
    } = props;

    const selectedDays = normaliseValue(value);

    const modifiers = {};

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
                initialMonth={selectedDays[0]}
                selectedDays={selectedDays}
                onMonthChange={onMonthChange}
                modifiers={modifiers}
                onDayClick={(day, { selected, disabled }) => {
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

                    onChange(map(newSelectedDays, roundToStartOfDay));
                }}
            />
        </div>
    );
}

DatePicker.defaultProps = {
    value: [],
    allowMultiSelection: false,
    disabledDays: { before: new Date() },
    lastMonth: null,
    onMonthChange: undefined,
    daysThemeDotIndicator: undefined,
    daysThemeStrikeout: undefined,
};

DatePicker.propTypes = {
    /**
     * One or more dates to show as selected in the initial UI. Each "date" can be a JS Date object
     * or a string representing a date, and either a single object or an array of such objects
     * can be provided.
     */
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.array]),
    /**
     * Callback that is triggered when the user selects a date. The function receives an array of
     * a JavaScript Date objects for each of the currently selected dates.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Boolean that determines whether or not the user is allowed to select more than one date at
     * a time. Defaults to `false`.
     */
    allowMultiSelection: PropTypes.bool,
    /**
     * A react-day-picker modifier for greater control over disabled days. Past selection is
     * disabled by default.
     * http://react-day-picker.js.org/docs/modifiers.html
     */
    disabledDays: DayPickerPropTypes.ModifierPropType,
    /**
     * A Date object representing the last allowed month. Users won’t be able to navigate or
     * interact with the days after it.
     */
    lastMonth: PropTypes.instanceOf(Date),
    /**
     * Callback that is triggered when the user navigates to a different month using the navigation
     * buttons or keyboard. The function receives a single JavaScript `Date` object indicating
     * the new on-screen month.
     */
    onMonthChange: PropTypes.func,
    /**
     * Applies a blue dot indicator below the numeric day in the calendar's day cell if the
     * function returns `true` for a given JavaScript `Date`.
     */
    daysThemeDotIndicator: PropTypes.func,
    /**
     * Applies a strikeout treatment on the numeric day in the calendar's day cell if the function
     * returns `true` for a given JavaScript `Date`.
     */
    daysThemeStrikeout: PropTypes.func,
};
