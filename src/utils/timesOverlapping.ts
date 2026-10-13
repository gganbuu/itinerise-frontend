import { Temporal } from "temporal-polyfill";

// export default function timesOverlapping(startTime, durationMinutes, currentTime) {
//     const startDate = new Date(startTime);
//     const currentDate = new Date(currentTime);
//     const endDate = new Date(startTime)
//     endDate.setMinutes(endDate.getMinutes() + durationMinutes)

//     console.log(`start time; ${startDate}`)
//     console.log(`end time; ${endDate}`)
//     console.log(`current time; ${currentDate}`)


//     return currentDate > startDate && currentDate < endDate;
// }

export function timesOverlapping(startTime: string, durationMinutes: number, currentTime: string): boolean {
    const startDateTime = Temporal.PlainDateTime.from(startTime)
    const endDateTime = Temporal.PlainDateTime.from(startTime).add({minutes: durationMinutes})
    const currentDateTime = Temporal.PlainDateTime.from(currentTime)

    // console.log(`start time; ${startDateTime}`)
    // console.log(`end time; ${endDateTime}`)
    // console.log(`current time; ${currentDateTime}`)

    const currentDateAfter = Temporal.PlainDateTime.compare(currentDateTime, startDateTime)
    const currentDateBefore = Temporal.PlainDateTime.compare(endDateTime, currentDateTime)

    return currentDateBefore == 1 && currentDateAfter == 1;

}