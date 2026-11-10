import { useSubmit } from "react-router";

import type { Activity, IsoInstant } from "../types/types";

import { MOVE_ACTIVITY_INTENT } from "../constants/calendar";

// returns a function that schedules an activity at `startTime`, or banks it when `startTime` is null

export function useMoveActivity() {
    const submit = useSubmit()

    return (activity: Activity, startTime: IsoInstant | null ) => {
        // a banked activity going back into the bank changes nothing, so skip request
        if (activity.startTime === null && startTime === null) return
        
        submit(
            // FormData can't hold null, so '' means 'no start time'; moveActivityAction turns it back into null
            { intent: MOVE_ACTIVITY_INTENT, activityId: String(activity.id), startTime: startTime ?? ''},
            // one fetcher per activity: a newer move of the same activity replaces the older pending one
            { method: 'post', navigate: false, fetcherKey: `move-${activity.id}`}
        )
    }
}