import type { Activity, ScheduledActivity } from "../types/types"

export const isScheduled = (activity: Activity): activity is ScheduledActivity => {
    return activity.startTime !== null;
}