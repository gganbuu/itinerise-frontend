import type { IsoInstant } from "../types/types";
import { Temporal } from "temporal-polyfill";

// takes an isoinstant date in format "2026-10-26T02:22:00Z" and converts to plaindate
export const toPlainDate = (isoInstantString: IsoInstant): Temporal.PlainDate => {
    const instant: Temporal.Instant = Temporal.Instant.from(isoInstantString)
    const plainDate: Temporal.PlainDate = instant.toZonedDateTimeISO('UTC').toPlainDate()
    return plainDate
}