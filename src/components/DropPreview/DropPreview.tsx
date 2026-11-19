import { useDragOperation } from '@dnd-kit/react'
import type { Temporal } from 'temporal-polyfill'
import styles from './DropPreview.module.css'
import type { Activity, ActivityDragData } from '../../types/types'
import { getDropDestination } from '../../pages/TripPage/getDropDestination'
import { toPlainDate } from '../../utils/toPlainDate'
import { getStartMinutes } from '../../utils/getStartMinutes'
import { minutesToGridRow, durationToRowSpan } from '../../utils/calendarGrid'
import { canDropAt } from '../../utils/canDropAt'

interface DropPreviewProps {
  date: Temporal.PlainDate;
  activities: Activity[];   // this day's activities
}

// outline showing where the dragged activity will land; only the column whose date matches renders it
const DropPreview = ({ date, activities }: DropPreviewProps) => {
  const { source, target } = useDragOperation()   // re-renders when either changes; both null when idle
  if (!source || !target) return null

  const destination = getDropDestination(target)  // same translation handleDragEnd uses
  if (destination?.kind !== 'timeSlot') return null
  if (!toPlainDate(destination.startTime).equals(date)) return null

  const { activity } = source.data as ActivityDragData
  const valid = canDropAt(activity, destination.startTime, activities)
  const startRow = minutesToGridRow(getStartMinutes(destination.startTime))
  const span = durationToRowSpan(activity.durationMinutes)

  return (
    <div
      aria-hidden
      className={`${styles.preview} ${valid ? '' : styles.invalid}`}
      style={{ gridRow: `${startRow} / span ${span}`, gridColumn: 1 }}
    >
    </div>
  )
}

export default DropPreview
