import React from 'react'
import styles from './CalendarColumn.module.css'
import { useDroppable } from '@dnd-kit/react'

const CalendarColumn = ({date}) => {
    const dayOfTheWeek = date.toLocaleDateString('en-US', {weekday: 'short'})
    const shortDate = date.toLocaleDateString('ja-JP', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit'
                        });
    const { ref } = useDroppable({
        date
    })

    return (
        <div className={styles.calendarColumn}>
            <div className={styles.calendarDayHeading}>
                <p>{dayOfTheWeek}</p>
                <h4>{shortDate}</h4>
            </div>
            <div className={styles.timeColumn} ref={ref}>
            </div>
        </div>
    )
}

export default CalendarColumn