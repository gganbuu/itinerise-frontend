import { useFetchers } from 'react-router'
import type { Activity, IsoInstant } from '../types/types'
import { MOVE_ACTIVITY_INTENT } from '../constants/calendar'

export function useOptimisticActivities(activities: Activity[]): Activity[] {
    const fetchers = useFetchers()

    //activityId -> pending startTime (null = moving to the bank)
    const pendingStartTimes = new Map<string, IsoInstant | null>()
    for (const {formData} of fetchers) {
        if (formData?.get('intent') !== MOVE_ACTIVITY_INTENT) continue

        const activityId = formData.get('activityId')
        const startTime = formData.get('startTime')

        if (typeof activityId !== 'string') continue

        pendingStartTimes.set(activityId, typeof startTime === 'string' && startTime !== '' ? startTime: null)
    }

    return activities.map(activity => {
        const pendingStartTime = pendingStartTimes.get(String(activity.id))
        return pendingStartTime === undefined ? activity : {...activity, startTime: pendingStartTime}
    })

}