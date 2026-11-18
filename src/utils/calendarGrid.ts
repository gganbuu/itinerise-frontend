import type { Temporal } from "temporal-polyfill"
import type { IsoInstant} from "../types/types"
import { SLOT_HEIGHT_PX, SLOT_MINUTES, SLOTS_PER_DAY } from "../constants/calendar"

// css grid rows are 1-indexed and each row is constant
export const minutesToGridRow = (minutes: number): number => {
    return minutes / SLOT_MINUTES + 1;
}

// every activity takes up at least one row, even if it is shorter than a slot
export const durationToRowSpan = (durationMinutes: number): number => {
    // rows which duration spans --> e.g. 15mins = 1 row, 60 mins = 4 rows
    const durationRowSpan = Math.ceil(durationMinutes / SLOT_MINUTES)
    
    // if row duration is less than slot minutes, then we need   
    return Math.max(1, durationRowSpan)
}

// converts a slot (date + minutes after midnight) into the UTC instant the API stores.
export function slotStartTime(date: Temporal.PlainDate, startMinutes: number): IsoInstant {
    return date.toPlainDateTime()
        .add({ minutes: startMinutes})
        .toZonedDateTime('UTC')
        .toInstant()
        .toString()
}

// pixel offset from the top of a day column --> naerest slot index, clamped to day
export function offsetToSlotIndex(offsetPx: number): number {
    const slot = Math.round(offsetPx / SLOT_HEIGHT_PX)
    return Math.min(Math.max(slot, 0), SLOTS_PER_DAY - 1)
}

export function fitsInDay(startMinutes: number, durationMinutes: number): boolean {
    return startMinutes >= 0 && startMinutes + durationMinutes <= 24 * 60;
}