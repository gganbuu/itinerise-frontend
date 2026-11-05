import styles from './CalendarColumn.module.css'
import ActivityBlock from '../ActivityBlock/ActivityBlock'
import CalendarTimeSlot from '../CalendarTimeSlot/CalendarTimeSlot'
import { getStartMinutes } from '../../utils/getStartMinutes'
import type { Temporal } from 'temporal-polyfill'
import type { Activity, ScheduledActivity } from '../../types/types'

interface CalendarColumnProps { 
    date: Temporal.PlainDate;
    activities: ScheduledActivity[];
    openDeleteModal: (activity: Activity) => void;
}

const CalendarColumn = ({date, activities, openDeleteModal}: CalendarColumnProps) => {
    const dayOfTheWeek = date.toLocaleString('en-US', { weekday: 'short' })
    const shortDate = date.toString()

    return (
        <div className={styles.calendarColumn}>
            <div className={styles.calendarDayHeading}>
                <p>{dayOfTheWeek}</p>
                <h4>{shortDate}</h4>
            </div>
            <div className={styles.timeColumn}>
                {Array.from({length: 96}).map((_,i) => <CalendarTimeSlot key={i} date={date} startMinutes={i * 15}/>)}

                {activities.map(a => {
                    const startRow = getStartMinutes(a.startTime) / 15 + 1
                    const span = Math.max(1, Math.ceil(a.durationMinutes / 15))
                    return (
                        <ActivityBlock
                            key={a.id}
                            activity={a}
                            style={{ gridRow: `${startRow} / span ${span}`, gridColumn: 1, zIndex: 1}}
                            onTrashClick={() => openDeleteModal(a)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CalendarColumn