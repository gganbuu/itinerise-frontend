import getDaysFromTrip from "../src/utils/getDaysFromTrip";

// formats a Date as 'yyyy-mm-dd' using local time
const toDateString = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

describe("testing get days from trip", () => {
    test("test 1 - 2026-03-29 to 2026-04-05 -> 8 days", () => {
        const days = getDaysFromTrip("2026-03-29", "2026-04-05")
        expect(days).toHaveLength(8)
        expect(days.map(toDateString)).toStrictEqual([
            "2026-03-29",
            "2026-03-30",
            "2026-03-31",
            "2026-04-01",
            "2026-04-02",
            "2026-04-03",
            "2026-04-04",
            "2026-04-05",
        ])
    })
    test("test 2 - 2026-03-08 to 2026-03-08 -> 1 day", () => {
        const days = getDaysFromTrip("2026-03-08", "2026-03-08")
        expect(days).toHaveLength(1)
        expect(days.map(toDateString)).toStrictEqual([
            "2026-03-08",
        ])
    })
    test("test 3 - 2026-12-29 to 2027-01-02 -> 5 days", () => {
        const days = getDaysFromTrip("2026-12-29", "2027-01-02")
        expect(days).toHaveLength(5)
        expect(days.map(toDateString)).toStrictEqual([
            "2026-12-29",
            "2026-12-30",
            "2026-12-31",
            "2027-01-01",
            "2027-01-02",
        ])
    })
})
