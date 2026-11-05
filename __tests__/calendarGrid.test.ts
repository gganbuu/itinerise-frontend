import { SLOT_MINUTES } from "../src/constants/calendar";
import {minutesToGridRow, durationToRowSpan} from "../src/utils/calendarGrid";

describe("minutesToGridRow tests", () => {
    test("0 minutes case", () => {
        expect(minutesToGridRow(0)).toBe(1)
    })
    test("60 minutes case", () => {
        expect(minutesToGridRow(60)).toBe(Math.ceil(60 / SLOT_MINUTES) + 1)
    })
})

describe("durationToRowSpan", () => {
    test("10 minutes case", () => {
        expect(durationToRowSpan(10)).toBe(1)
    })
    test("61 minutes case", () => {
        expect(durationToRowSpan(61)).toBe(5)
    })
})