import { Temporal } from "temporal-polyfill"
import type { Activity, IsoInstant } from "../types/types"

export const getTimeInterval = (isoString: IsoInstant, durationMinutes: number): string | null => { 
    const startTime = Temporal.Instant.from(isoString)
                                      .toZonedDateTimeISO('UTC')
                                      .toLocaleString('en-AU', { timeStyle: 'short' })
    const endTime = Temporal.Instant.from(isoString)
                                    .add({minutes: durationMinutes})
                                    .toZonedDateTimeISO('UTC')
                                    .toLocaleString('en-AU', { timeStyle: 'short' })
    const interval = `${startTime} - ${endTime}`
    return interval;
  }