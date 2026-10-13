import { getStartMinutes } from "../src/utils/getStartMinutes";

describe("test case 1", () => {
    test("5:36AM test", () => {
        const minutes = getStartMinutes('2026-10-11T05:36:00.000Z')
        expect(minutes).toBe(336)
    })
    test("6:36AM test", () => {
        const minutes = getStartMinutes('2026-10-11T06:36:00.000Z')
        expect(minutes).toBe(396)
    })
    test("12:00AM test", () => {
        const minutes = getStartMinutes('2026-10-11T00:00:00.000Z')
        expect(minutes).toBe(0)
    })
    test("11:45PM test", () => {
        const minutes = getStartMinutes('2026-10-11T23:45:00.000Z')
        expect(minutes).toBe(1425)
    })
})