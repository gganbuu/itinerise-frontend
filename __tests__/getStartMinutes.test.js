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
    test("6:36AM invalid test", () => {
        const minutes = getStartMinutes('2026-10-11T06:36:00.000Z')
        expect(minutes).not.toBe(106)
    })
})