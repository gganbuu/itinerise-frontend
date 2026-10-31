import { Temporal } from "temporal-polyfill"
import type { IsoInstant } from "../types/types"

export function getStartMinutes(startTime: IsoInstant): number {
    const newDateTime = Temporal.Instant.from(startTime).toZonedDateTimeISO('UTC')
    return newDateTime.hour * 60 + newDateTime.minute
}