import React from 'react'
import styles from './CalendarColumn.module.css'
import { toShortDate } from '../../utils/toShortDate'
import { getWeekDay } from '../../utils/getWeekDay'
import { useDroppable } from '@dnd-kit/react'
import Activity from '../Activity/Activity'
import CalendarTimeSlot from '../CalendarTimeSlot/CalendarTimeSlot'
import { getStartMinutes } from '../../utils/getStartMinutes'
import { Temporal } from 'temporal-polyfill'

const CalendarColumn = ({date, activities}) => {
    const temporalDate = Temporal.PlainDate.from(date)
    const dayOfTheWeek = getWeekDay(temporalDate.dayOfWeek).slice(0, 3)
    const shortDate = temporalDate.toString()
    // console.log(activities)

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
                        <Activity
                            key={a.id}
                            activity={a}
                            style={{ gridRow: `${startRow} / span ${span}`, gridColumn: 1, zIndex: 1}}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CalendarColumn