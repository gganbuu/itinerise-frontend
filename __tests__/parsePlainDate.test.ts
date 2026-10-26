import { parsePlainDate } from "../src/utils/parsePlainDate";
import { Temporal } from "temporal-polyfill";

describe("ParsePlainDate test cases", () => {
    test("Invalid string ", () => {
        const str = ''
        expect(parsePlainDate(str)).toBeNull()
    })
    test("Valid string - correct type and correct value", () => {
        const str = '2026-09-10';
        const res = parsePlainDate(str)
        expect(res instanceof Temporal.PlainDate).toBeTruthy()
        expect(Temporal.PlainDate.from(str)).toStrictEqual(res)
    })
    test("Impossible dates throw range error - 2026-02-30", () => {
        const str = '2026-02-30'
        expect(parsePlainDate(str)).toBeNull()
    })
    test("Leap years pass - 2028-02-29", () => {
        const str = '2028-02-29';
        const res = parsePlainDate(str)
        expect(res instanceof Temporal.PlainDate).toBeTruthy()
        expect(Temporal.PlainDate.from(str)).toStrictEqual(res)
    })
    test("rejects a leap day in a non-leap year", () => {
        expect(parsePlainDate("2026-02-29")).toBeNull()
    })
    test("rethrows errors that aren't RangeError", () => {
        const spy = vi.spyOn(Temporal.PlainDate, "from").mockImplementation(() => { throw new TypeError("boom") })
        expect(() => parsePlainDate("2026-10-01")).toThrow(TypeError)
        spy.mockRestore()
    })
})