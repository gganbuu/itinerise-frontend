import React from 'react'
import styles from './CalendarTimeSlot.module.css'
import { useDroppable } from '@dnd-kit/react'
import type { Temporal } from 'temporal-polyfill'


export interface TimeSlotData {
    date: Temporal.PlainDate;
    startMinutes: number;
}

const CalendarTimeSlot = ({date, startMinutes}: TimeSlotData) => {
    const { ref } = useDroppable({
        id: `${date.toString()}-${startMinutes}`,
        type: 'timeSlot',
        data: { date, startMinutes }
    })

    return (
        <div ref={ref} className=
            {`
            ${styles.slot}
            ${startMinutes % 60 === 0 ? styles.hourStart: ''}
            `}
            style={{ gridRow: startMinutes / 15 + 1, gridColumn: 1 }}>

        </div>
    )
}

export default CalendarTimeSlot