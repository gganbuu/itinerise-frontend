import { Temporal } from "temporal-polyfill"

export function getStartMinutes(startTime) {
    const newDateTime = Temporal.Instant.from(startTime).toZonedDateTimeISO('UTC')
    return newDateTime.hour * 60 + newDateTime.minute
}