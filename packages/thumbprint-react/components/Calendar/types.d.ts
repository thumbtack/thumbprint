export type DateIsh = Date | string | number;

export type Modifier =
    | Date
    | RangeModifier
    | BeforeModifier
    | AfterModifier
    | BeforeAfterModifier
    | DaysOfWeekModifier
    | FunctionModifier
    | undefined
    | null;
