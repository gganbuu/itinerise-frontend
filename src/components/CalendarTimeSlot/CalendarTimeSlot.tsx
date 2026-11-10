import styles from './CalendarTimeSlot.module.css'
import { useDroppable } from '@dnd-kit/react'
import type { Temporal } from 'temporal-polyfill'
import type { TimeSlotData } from '../../types/types'
import { ACTIVITY_DRAG_TYPE, TIME_SLOT_DROP_TYPE } from '../../constants/calendar';
import { minutesToGridRow, slotStartTime } from '../../utils/calendarGrid';

interface CalendarTimeSlotProps {
    date: Temporal.PlainDate;
    startMinutes: number;
}

const CalendarTimeSlot = ({date, startMinutes}: CalendarTimeSlotProps) => {
    const data: TimeSlotData = {startTime: slotStartTime(date, startMinutes)}
    const { ref } = useDroppable({
        id: `${date.toString()}-${startMinutes}`,
        type: TIME_SLOT_DROP_TYPE,
        accept: ACTIVITY_DRAG_TYPE,
        data
    })
    const isHourStart = startMinutes % 60 === 0

    return (
        <div ref={ref} className=
            {`
            ${styles.slot}
            ${isHourStart ? styles.hourStart: ''}
            `}
            style={{ gridRow: minutesToGridRow(startMinutes), gridColumn: 1 }}/>
    )
}

export default CalendarTimeSlot