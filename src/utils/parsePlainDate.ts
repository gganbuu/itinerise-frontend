import { Temporal } from "temporal-polyfill";
// parses "yyy-mm-dd" string; returns null for anything that isn't a real date
// returns null if string is not a real calendar date i.e. 2026-02-30 or banana
// any other error is a bug, so it is rethrown rather than hidden
export function parsePlainDate(value: string): Temporal.PlainDate | null {
    try {
        return Temporal.PlainDate.from(value);
    } catch (error) {
        if (error instanceof RangeError) return null
        throw error;
    }
}