import React from 'react'
import styles from './CalendarTimeSlot.module.css'
import { useDroppable } from '@dnd-kit/react'


const CalendarTimeSlot = ({date, startMinutes}) => {
    const { ref } = useDroppable({
        id: `${date.toDateString()}-${startMinutes}`,
        type: 'timeSlot',
        data: { date, startMinutes }
    })

    return (
        <div ref={ref} className={
            `
            ${styles.slot}
            ${startMinutes % 60 === 0 ? styles.hourStart: ''}
            `}
            style={{ gridRow: startMinutes / 15 + 1, gridColumn: 1 }}>

        </div>
    )
}

export default CalendarTimeSlot