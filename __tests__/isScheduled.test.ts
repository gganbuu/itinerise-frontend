import { isScheduled } from "../src/utils/isScheduled";
import type { Activity, ScheduledActivity } from "../src/types/types";

const makeActivity = (startTime: string | null): Activity => ({
    id: 1, tripId: 1, name: "Museum", category: "Culture", location: "Tokyo",
    durationMinutes: 60, startTime, cost: null, description: null,
});

describe("isScheduled", () => {
    test("activity with a start time is scheduled", () => {
        expect(isScheduled(makeActivity("2026-10-08T09:00:00.000Z"))).toBe(true)
    })
    test("activity in the bank is not scheduled", () => {
        expect(isScheduled(makeActivity(null))).toBe(false)
    })
    test("filter narrows the type to ScheduledActivity[]", () => {
        const result = [makeActivity(null), makeActivity("2026-10-08T09:00:00.000Z")].filter(isScheduled)
        expect(result).toHaveLength(1)
        expectTypeOf(result).toEqualTypeOf<ScheduledActivity[]>()
        expectTypeOf(result[0].startTime).toEqualTypeOf<string>()
    })
})
