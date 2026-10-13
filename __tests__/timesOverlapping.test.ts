import { timesOverlapping} from "../src/utils/timesOverlapping";

describe("times overlapping test cases", () => {
    test("times overlapping true", () => {
        const startDate = '2026-10-08T09:00:00';
        const durationMinutes = 60;
        const currentDate = '2026-10-08T09:30:00';
        const check = timesOverlapping(startDate, durationMinutes, currentDate)
        expect(check).toBe(true)
    })
    test("times overlapping", () => {
        const startDate = '2026-10-08T09:00:00';
        const durationMinutes = 60;
        const currentDate = '2026-10-08T10:30:00';
        const check = timesOverlapping(startDate, durationMinutes, currentDate)
        expect(check).toBe(false)
    })
    test("times overlapping with string", () => {
        const startDate = '2026-10-08T09:00:00';
        const durationMinutes = 60;
        const currentDate = '2026-10-08T10:30:00';
        const check = timesOverlapping(startDate, durationMinutes, currentDate)
        expect(check).toBe(false)
    })
})