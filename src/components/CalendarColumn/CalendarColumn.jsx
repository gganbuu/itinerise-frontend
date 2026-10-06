import React from 'react'
import styles from './CalendarColumn.module.css'
import { toShortDate } from '../../utils/toShortDate'
import { useDroppable } from '@dnd-kit/react'
import Activity from '../Activity/Activity'

const CalendarColumn = ({date, activities}) => {
    const dayOfTheWeek = date.toLocaleDateString('en-US', {weekday: 'short'})
    const shortDate = toShortDate(date)

    const { ref } = useDroppable({
        id: shortDate
    })

    return (
        <div className={styles.calendarColumn}>
            <div className={styles.calendarDayHeading}>
                <p>{dayOfTheWeek}</p>
                <h4>{shortDate}</h4>
            </div>
            <div className={styles.timeColumn} ref={ref}>
                {activities.map(a => <Activity key={a.id} activity={a} />)}
            </div>
        </div>
    )
}

export default CalendarColumn