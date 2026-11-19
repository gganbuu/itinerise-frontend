import type { Activity } from "../src/types/types"
import { canDropAt } from "../src/utils/canDropAt"

const activities: Activity[] = [
        {
            id: 1,
            tripId: 1,
            name: 'sampleActivity 1',
            category: 'Activity',
            location: 'Location',
            durationMinutes: 60,
            startTime: "2026-11-19T12:00:00Z",
            cost: '50',
            description: 'description'
        },
        {
            id: 2,
            tripId: 1,
            name: 'sampleActivity 2',
            category: 'Activity',
            location: 'Location',
            durationMinutes: 60,
            startTime: "2026-11-19T15:00:00Z",
            cost: '50',
            description: 'description'
        }
    ]


describe("canDropAt test cases", () => {
    test("inserting activity at a slot that can be dropped at", () => {
        const activity = {
            id: 3,
            tripId: 1,
            name: 'sampleActivity 3',
            category: 'Activity',
            location: 'Location',
            durationMinutes: 60,
            startTime: null,
            cost: '50',
            description: 'description'
        }
        expect(canDropAt(activity, "2026-11-19T10:00:00Z", activities)).toBe(true)
    })
    test("inserting activity at slot occupied by another activity", () => {
       const activity = {
            id: 3,
            tripId: 1,
            name: 'sampleActivity 3',
            category: 'Activity',
            location: 'Location',
            durationMinutes: 60,
            startTime: null,
            cost: '50',
            description: 'description'
        }
        expect(canDropAt(activity, "2026-11-19T11:30:00Z", activities)).toBe(false)
    })
    test("inserting activity that has start time + duration combo that exceeds midnight", () => {
        const activity = {
            id: 3,
            tripId: 1,
            name: 'sampleActivity 3',
            category: 'Activity',
            location: 'Location',
            durationMinutes: 120,
            startTime: null,
            cost: '50',
            description: 'description'
        }
        expect(canDropAt(activity, "2026-11-19T23:00:00Z", activities)).toBe(false)
    })
})