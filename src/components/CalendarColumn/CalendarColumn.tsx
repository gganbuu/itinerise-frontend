import styles from './CalendarColumn.module.css'
import ActivityBlock from '../ActivityBlock/ActivityBlock'
import CalendarTimeSlot from '../CalendarTimeSlot/CalendarTimeSlot'
import { getStartMinutes } from '../../utils/getStartMinutes'
import { minutesToGridRow, durationToRowSpan } from '../../utils/calendarGrid'
import type { Temporal } from 'temporal-polyfill'
import type { Activity, ScheduledActivity } from '../../types/types'
import { SLOT_MINUTES, SLOTS_PER_DAY } from '../../constants/calendar'

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
            <div className={styles.timeColumn} style={{ gridTemplateRows: `repeat(${SLOTS_PER_DAY}, 16px)`}}>
                {Array.from({length: SLOTS_PER_DAY}, (_, i) => <CalendarTimeSlot key={i} date={date} startMinutes={i * SLOT_MINUTES}/>)}

                {activities.map(a => {
                    const startRow = minutesToGridRow(getStartMinutes(a.startTime))
                    const span = durationToRowSpan(a.durationMinutes)
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