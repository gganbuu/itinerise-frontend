const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export type Weekday = (typeof WEEKDAYS)[number];


export function getWeekDay(num: number): Weekday {
    return WEEKDAYS[num];
}