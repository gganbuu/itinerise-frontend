import { getTimeInterval } from "../src/utils/getTimeInterval"



describe("getTimeInterval test cases", () => {
    test("start time 12:00, duration 1hr", () => {
        const activity = {
            id: 1,
            tripId: 1,
            name: 'sampleActivity 1',
            category: 'Activity',
            location: 'Location',
            durationMinutes: 60,
            startTime: "2026-11-19T12:00:00Z",
            cost: '50',
            description: 'description'
        }
        expect(getTimeInterval(activity.startTime, activity.durationMinutes)).toBe('12:00 pm - 1:00 pm')
    })
    test("start time 18, duration 2hr", () => {
        const activity = {
            id: 1,
            tripId: 1,
            name: 'sampleActivity 1',
            category: 'Activity',
            location: 'Location',
            durationMinutes: 120,
            startTime: "2026-11-19T18:00:00Z",
            cost: '50',
            description: 'description'
        }
        expect(getTimeInterval(activity.startTime, activity.durationMinutes)).toBe('6:00 pm - 8:00 pm')
    })
    
})

