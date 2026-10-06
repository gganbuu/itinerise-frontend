import { isValidDate } from "../src/utils/isValidDate";

describe("testing is valid date", () => {
    describe("valid dates", () => {
        test("test 1 - ordinary date 26/03/29 -> true", () => {
            expect(isValidDate("26/03/29")).toBe(true)
        })
        test("test 2 - first day of year 26/01/01 -> true", () => {
            expect(isValidDate("26/01/01")).toBe(true)
        })
        test("test 3 - last day of year 26/12/31 -> true", () => {
            expect(isValidDate("26/12/31")).toBe(true)
        })
        test("test 4 - 31st in a 31-day month 26/07/31 -> true", () => {
            expect(isValidDate("26/07/31")).toBe(true)
        })
        test("test 5 - 30th in a 30-day month 26/04/30 -> true", () => {
            expect(isValidDate("26/04/30")).toBe(true)
        })
        test("test 6 - leap day in a leap year 28/02/29 -> true", () => {
            expect(isValidDate("28/02/29")).toBe(true)
        })
        test("test 7 - year 00 is a leap year (2000) 00/02/29 -> true", () => {
            expect(isValidDate("00/02/29")).toBe(true)
        })
        test("test 8 - year boundaries 00/01/01 and 99/12/31 -> true", () => {
            expect(isValidDate("00/01/01")).toBe(true)
            expect(isValidDate("99/12/31")).toBe(true)
        })
    })

    describe("impossible dates", () => {
        test("test 9 - leap day in a non-leap year 26/02/29 -> false", () => {
            expect(isValidDate("26/02/29")).toBe(false)
        })
        test("test 10 - Feb 30 rolls over 28/02/30 -> false", () => {
            expect(isValidDate("28/02/30")).toBe(false)
        })
        test("test 11 - 31st in a 30-day month 26/04/31 -> false", () => {
            expect(isValidDate("26/04/31")).toBe(false)
            expect(isValidDate("26/06/31")).toBe(false)
            expect(isValidDate("26/09/31")).toBe(false)
            expect(isValidDate("26/11/31")).toBe(false)
        })
        test("test 12 - day 32 26/01/32 -> false", () => {
            expect(isValidDate("26/01/32")).toBe(false)
        })
        test("test 13 - day 00 26/01/00 -> false", () => {
            expect(isValidDate("26/01/00")).toBe(false)
        })
        test("test 14 - month 00 26/00/15 -> false", () => {
            expect(isValidDate("26/00/15")).toBe(false)
        })
        test("test 15 - month 13 26/13/01 -> false", () => {
            expect(isValidDate("26/13/01")).toBe(false)
        })
    })

    describe("wrong format", () => {
        test("test 16 - empty string -> false", () => {
            expect(isValidDate("")).toBe(false)
        })
        test("test 17 - four-digit year 2026/03/29 -> false", () => {
            expect(isValidDate("2026/03/29")).toBe(false)
        })
        test("test 18 - ISO format 2026-03-29 -> false", () => {
            expect(isValidDate("2026-03-29")).toBe(false)
        })
        test("test 19 - dashes instead of slashes 26-03-29 -> false", () => {
            expect(isValidDate("26-03-29")).toBe(false)
        })
        test("test 20 - missing leading zeros 26/3/9 -> false", () => {
            expect(isValidDate("26/3/9")).toBe(false)
        })
        test("test 21 - surrounding whitespace -> false", () => {
            expect(isValidDate(" 26/03/29")).toBe(false)
            expect(isValidDate("26/03/29 ")).toBe(false)
        })
        test("test 22 - letters 26/ab/29 -> false", () => {
            expect(isValidDate("26/ab/29")).toBe(false)
        })
        test("test 23 - missing segment 26/03 -> false", () => {
            expect(isValidDate("26/03")).toBe(false)
        })
        test("test 24 - extra segment 26/03/29/01 -> false", () => {
            expect(isValidDate("26/03/29/01")).toBe(false)
        })
    })
})
