import { timesOverlapping} from "../src/utils/timesOverlapping";

describe("times overlapping test cases", () => {
    test("9:00-10:00 & 9:30-10:30", () => {
        const occupiedStartDate = '2026-10-08T09:00:00Z';
        const occupiedDurationMinutes = 60;
        const currentStartDate = '2026-10-08T09:30:00Z';
        const currentDurationMinutes = 60;
        const check = timesOverlapping(occupiedStartDate, occupiedDurationMinutes, currentStartDate, currentDurationMinutes)
        expect(check).toBe(true)
    })
    test("09:00-10:00 & 10:30-11:30", () => {
        const occupiedStartDate = '2026-10-08T09:00:00Z';
        const occupiedDurationMinutes = 60;
        const currentStartDate = '2026-10-08T10:30:00Z';
        const currentDurationMinutes = 60;
        const check = timesOverlapping(occupiedStartDate, occupiedDurationMinutes, currentStartDate, currentDurationMinutes)
        expect(check).toBe(false)
    })
    test("09:00-10:00 & 10:00-11:00", () => {
        const occupiedStartDate = '2026-10-08T09:00:00Z';
        const occupiedDurationMinutes = 60;
        const currentStartDate = '2026-10-08T10:00:00Z';
        const currentDurationMinutes = 60;
        const check = timesOverlapping(occupiedStartDate, occupiedDurationMinutes, currentStartDate, currentDurationMinutes)
        expect(check).toBe(false)
    })
    test("20:00-21:00 & 19:00-21:00", () => {
        const occupiedStartDate = '2026-10-08T20:00:00Z';
        const occupiedDurationMinutes = 60;
        const currentStartDate = '2026-10-08T19:00:00Z';
        const currentDurationMinutes = 120;
        const check = timesOverlapping(occupiedStartDate, occupiedDurationMinutes, currentStartDate, currentDurationMinutes)
        expect(check).toBe(true)
    })
})