import { getWeekDay } from "../src/utils/getWeekDay.ts";

describe("get weekday testcases", () => {
    test("sunday test", () => {
        expect(getWeekDay(0)).toBe("Sunday")
    })
    test("monday test", () => {
        expect(getWeekDay(1)).toBe("Monday")
    })
    test("teusday test", () => {
        expect(getWeekDay(2)).toBe("Tuesday")
    })
})