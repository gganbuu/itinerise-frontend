import styles from './CalendarTimeSlot.module.css'
import { useDroppable } from '@dnd-kit/react'
import type { Temporal } from 'temporal-polyfill'
import type { TimeSlotData } from '../../types/types'
import { TIME_SLOT_DROP_TYPE, ACTIVITY_DRAG_TYPE } from '../../constants/calendar';
import { slotStartTime } from '../../utils/calendarGrid';

interface CalendarTimeSlotProps {
    date: Temporal.PlainDate;
    startMinutes: number;
}

const CalendarTimeSlot = ({date, startMinutes}: CalendarTimeSlotProps) => {
    const data: TimeSlotData = {startTime: slotStartTime(date, startMinutes)}
    const { ref } = useDroppable({
        id: `${date.toString()}-${startMinutes}`,
        type: TIME_SLOT_DROP_TYPE,
        data
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