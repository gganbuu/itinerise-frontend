import { SLOT_MINUTES } from "../src/constants/calendar";
import {minutesToGridRow, durationToRowSpan, slotStartTime, offsetToSlotIndex, fitsInDay} from "../src/utils/calendarGrid";
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

describe("offsetToSlotIndex test", () => {
    test("offsetPx = 0", () => {
        const offsetPx = 0;
        expect(offsetToSlotIndex(offsetPx)).toBe(0)
    })
    test("offsetPx = 7", () => {
        const offsetPx = 7;
        expect(offsetToSlotIndex(offsetPx)).toBe(0)
    })
    test("offsetPx = 8", () => {
        const offsetPx = 8;
        expect(offsetToSlotIndex(offsetPx)).toBe(1)
    })
    test("offsetPx = 32", () => {
        const offsetPx = 32;
        expect(offsetToSlotIndex(offsetPx)).toBe(2)
    })
})

describe("fitsInDay test", () => {
    test("test 1", () => {
        const startMinutes = 0; 
        const durationMinutes = 60;
        expect(fitsInDay(startMinutes, durationMinutes)).toBe(true)
    })
    test("test 2", () => {
        const startMinutes = 0; 
        const durationMinutes = 60;
        expect(fitsInDay(startMinutes, durationMinutes)).toBe(true)
    })
    test("test 3", () => {
        const hours23ToMinutes = 60 * 23
        const startMinutes = hours23ToMinutes; 
        const durationMinutes = 120;
        expect(fitsInDay(startMinutes, durationMinutes)).toBe(false)
    })
    
})