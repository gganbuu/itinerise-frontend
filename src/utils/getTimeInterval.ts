import { Temporal } from "temporal-polyfill"
import type { Activity } from "../types/types"

export const getTimeInterval = (activity: Activity): string | null => { 
    if (!activity.startTime) return null
    const startTime = Temporal.Instant.from(activity.startTime)
                                      .toZonedDateTimeISO('UTC')
                                      .toLocaleString('en-AU', { timeStyle: 'short' })
    const endTime = Temporal.Instant.from(activity.startTime)
                                    .add({minutes: activity.durationMinutes})
                                    .toZonedDateTimeISO('UTC')
                                    .toLocaleString('en-AU', { timeStyle: 'short' })
    const interval = `${startTime} - ${endTime}`
    return interval;
  }