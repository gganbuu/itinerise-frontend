import { SLOT_MINUTES } from "../src/constants/calendar";
import {minutesToGridRow, durationToRowSpan, slotStartTime} from "../src/utils/calendarGrid";
import { Temporal } from "temporal-polyfill";

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

describe("slotStartTime", () => { 
    test("570 minutes and 2026/10/08", () => {
        const plainDate = Temporal.PlainDate.from('2026-10-08')
        expect(slotStartTime(plainDate, 570)).toBe('2026-10-08T09:30:00Z')
    })
    test("24x60 minutes and 2026/12/31", () => {
        const plainDate = Temporal.PlainDate.from('2026-12-31')
        expect(slotStartTime(plainDate, 24*60 + 10)).toBe('2027-01-01T00:10:00Z')
    })
})