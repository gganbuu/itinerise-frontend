import type { Activity, ScheduledActivity } from "../types/types"
// checks if activity is scheduled by checking the startime is NOT null
// use type predicate (activity is scheduledActivity) to narrow the type of activity to scheduled activity
export const isScheduled = (activity: Activity): activity is ScheduledActivity => {
    return activity.startTime !== null;
}