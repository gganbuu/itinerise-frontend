import type { Activity, IsoInstant } from '../types/types'
import { fitsInDay } from './calendarGrid'
import { findOverlappingActivity } from './findOverlappingActivity'
import { getStartMinutes } from './getStartMinutes'

export function canDropAt(activity: Activity, startTime: IsoInstant, activities: Activity[]): boolean {
    return fitsInDay(getStartMinutes(startTime), activity.durationMinutes)
    && !findOverlappingActivity(activity, startTime, activities)
}