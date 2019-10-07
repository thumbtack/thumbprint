export type DateIsh = Date | string | number;

export interface PropTypes {
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
