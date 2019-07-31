import some from 'lodash/some';
import castArray from 'lodash/castArray';
import map from 'lodash/map';

import isBefore from 'date-fns/is_before';
import isToday from 'date-fns/is_today';
import endOfDay from 'date-fns/end_of_day';
import parse from 'date-fns/parse';

// Throws an error `message` with a prefix showing that it comes from the DatePicker.
function throwError(message) {
    throw new Error(`TUI DatePicker: ${message}`);
}

// Returns true any of the given `dates` fall on a day before the day of `cutoff`.
export function hasAnyPastDays(dates, cutoff = new Date()) {
    return some(dates, date => isBefore(endOfDay(date), cutoff));
}

// Normalise the `value` prop to always be an array of dates.
export function normaliseValue(value) {
    return map(castArray(value), parse);
}

export function roundToStartOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Validate the `props` object and throw errors if there are any inconsistencies.
export function validateProps(props) {
    const days = normaliseValue(props.value);

    if (!props.allowMultiSelection && days.length > 1) {
        throwError('`allowMultiSelection` is `false` but multiple dates were provided');
    }

    const pastSelectionDisabled = props.disabledDays && isToday(props.disabledDays.before);
    if (pastSelectionDisabled && hasAnyPastDays(days)) {
        throwError('Past selection is disabled but one or more provided dates are in the past');
    }
}
