import React from 'react'
import styles from './TimeGutter.module.css'
import { SLOTS_PER_DAY, SLOT_HEIGHT_PX } from '../../constants/calendar'


const TimeGutter = () => {
  const isHourSlot = (slot: number) => {
    return slot % (SLOTS_PER_DAY / 24) == 0
  }
  const hourTimes12: string[] = Array.from({length: 25}, (_, hour) => {
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}${period}`;
  })
  return (
    <div className={styles.calendarColumn}>
        <div className={styles.calendarDayHeading}>
          <p>p</p>
          <h4>h</h4>
        </div>
        <div className={styles.timeGutter} style={{ gridTemplateRows: `repeat(${SLOTS_PER_DAY}, ${SLOT_HEIGHT_PX}px)`}}>
          {Array.from({length: SLOTS_PER_DAY}, (_, slot) => {
            if (isHourSlot(slot)) {
              return <p key={slot}>{hourTimes12[slot/(SLOTS_PER_DAY / 24)]}</p>
            } else { return <p key={slot}/> }
          })}

        </div>
    </div>
  )
}

export default TimeGutter