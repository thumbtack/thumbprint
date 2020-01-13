import some from 'lodash/some';

import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import endOfDay from 'date-fns/end_of_day';
import startOfDay from 'date-fns/start_of_day';

// Returns true any of the given `dates` fall on a day before the day of `cutoff`.
export function hasAnyPastDays(dates: Date[], cutoff: Date = new Date()): boolean {
    return some(dates, date => isBefore(endOfDay(date), cutoff));
}

// Returns true any of the given `dates` fall on a day after the day of `cutoff`.
export function hasAnyFutureDays(dates: Date[], cutoff: Date = new Date()): boolean {
    return some(dates, date => isAfter(startOfDay(date), cutoff));
}
