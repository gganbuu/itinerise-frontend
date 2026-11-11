import { findOverlappingActivity } from "../src/utils/findOverlappingActivity";

import type { Activity } from "../src/types/types";

const makeActivity = (id: number, startTime: string | null, durationMinutes: number): Activity => ({
    id, tripId: 1, name: `activity ${id}`, category: "", location: "",
    durationMinutes, startTime, cost: null, description: null,
})

describe("find overlapping activity test cases", () => {
    const museum = makeActivity(1, '2026-10-08T09:00:00Z', 60)
    const banked = makeActivity(2, null, 60)
    test("dropping into an occupied time returns the occupying activity", () => {
        const lunch = makeActivity(3, null, 60)
        expect(findOverlappingActivity(lunch, '2026-10-08T09:30:00Z', [museum, banked, lunch])).toBe(museum)
    })
    test("dropping just after an activity ends is allowed", () => {
        const lunch = makeActivity(3, null, 60)
        expect(findOverlappingActivity(lunch, '2026-10-08T10:00:00Z', [museum, banked, lunch])).toBeUndefined()
    })
    test("dropping into an unoccupied time returns undefined", () => {
        const lunch = makeActivity(3, null, 60)
        expect(findOverlappingActivity(lunch, '2026-10-08T10:30:00Z', [museum, banked, lunch])).toBeUndefined()
    })
})