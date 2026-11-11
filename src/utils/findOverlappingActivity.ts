import type { Activity, IsoInstant, ScheduledActivity} from "../types/types"
import { isScheduled } from "./isScheduled"
import { timesOverlapping } from "./timesOverlapping"

// returns the first scheduled activity that 'activity' would overlap with if it started at 'start time'
// 'moving' itself is skipped, so an activity can be nudged into a slot it currently covers
export function findOverlappingActivity(
    activity: Activity, 
    startTime: IsoInstant, 
    activities: Activity[]
): ScheduledActivity | undefined {
    return activities.filter(isScheduled)
                     .find(other => 
                        other.id !== activity.id &&
                        timesOverlapping(other.startTime, other.durationMinutes, startTime, activity.durationMinutes)
                     )
}