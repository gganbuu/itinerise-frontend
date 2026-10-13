import { Temporal } from "temporal-polyfill";

export default function getDaysFromTrip(startDate: string, endDate: string): Temporal.PlainDate[] {
    const days: Temporal.PlainDate[] = [];
    const startDateSliced = startDate.slice(0,10)
    const endDateSliced = endDate.slice(0,10)

    let currentDate = Temporal.PlainDate.from(startDateSliced);
    const lastDate = Temporal.PlainDate.from(endDateSliced);
    
    while (Temporal.PlainDate.compare(currentDate, lastDate) <= 0) {
        days.push(currentDate)
        currentDate = currentDate.add({days: 1})
    }

    return days
}
