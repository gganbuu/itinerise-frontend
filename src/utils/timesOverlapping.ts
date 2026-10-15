import { Temporal } from "temporal-polyfill";

export function timesOverlapping(
    occupiedStartTime: string,
    occupiedDurationMinutes: number,
    currentStartTime: string,
    currentDurationMinutes: number
): boolean {
    const occupiedStart = Temporal.Instant.from(occupiedStartTime)
    const occupiedEnd = occupiedStart.add({ minutes: occupiedDurationMinutes })
    const currentStart = Temporal.Instant.from(currentStartTime)
    const currentEnd = currentStart.add({ minutes: currentDurationMinutes })

    // two time ranges overlap when each one starts before the other one ends
    const currentStartsBeforeOccupiedEnds = Temporal.Instant.compare(currentStart, occupiedEnd) < 0
    const occupiedStartsBeforeCurrentEnds = Temporal.Instant.compare(occupiedStart, currentEnd) < 0

    return currentStartsBeforeOccupiedEnds && occupiedStartsBeforeCurrentEnds
}
