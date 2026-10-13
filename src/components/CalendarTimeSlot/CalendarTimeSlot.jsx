import React from 'react'
import styles from './CalendarTimeSlot.module.css'
import { useDroppable } from '@dnd-kit/react'
import { Temporal } from 'temporal-polyfill'

const CalendarTimeSlot = ({date, startMinutes}) => {
    const temporalDate = Temporal.PlainDate.from(date)
    const { ref } = useDroppable({
        id: `${temporalDate.toString()}-${startMinutes}`,
        type: 'timeSlot',
        data: { temporalDate, startMinutes }
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