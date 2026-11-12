import { useState, type CSSProperties } from 'react';
import styles from './ActivityBlock.module.css'
import { useDraggable } from '@dnd-kit/react'
import type { Activity, ActivityDragData } from '../../types/types'
import { Trash } from 'lucide-react';
import { ACTIVITY_DRAG_TYPE } from '../../constants/calendar';
import { Temporal } from 'temporal-polyfill';

interface ActivityBlockProps {
  activity: Activity;
  style?: CSSProperties;
  onTrashClick: (activity: Activity) => void;
}

const ActivityBlock = ({activity, style, onTrashClick}: ActivityBlockProps) => {
  const [hoverState, setHoverState] = useState<boolean>(false)
  const dragData: ActivityDragData = { activity }
  const handleHoverOn = () => {
    setHoverState(true)
  }
  const handleHoverOff = () => {
    setHoverState(false)
  }
  const { ref } = useDraggable({
    id: activity.id,
    type: ACTIVITY_DRAG_TYPE,
    data: dragData,
  })

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'activity':
        return styles.activityStyle;
      case 'exploring':
        return styles.exploringStyle;
      case 'food':
        return styles.foodStyle;
      case 'shopping':
        return styles.shoppingStyle;
      case 'travel':
        return styles.travelStyle;
      default: 
        return styles.activityStyle;
    }
  }

  const getTimeInterval = (activity: Activity): string | null => { 
    if (!activity.startTime) return null
    const startTime = Temporal.Instant.from(activity.startTime)
                                      .toZonedDateTimeISO('UTC')
                                      .toLocaleString('en-AU', { timeStyle: 'short' })
    const endTime = Temporal.Instant.from(activity.startTime)
                                    .add({minutes: activity.durationMinutes})
                                    .toZonedDateTimeISO('UTC')
                                    .toLocaleString('en-AU', { timeStyle: 'short' })
    const interval = `${startTime} - ${endTime}`
    return interval;
  }

  const timeInterval = getTimeInterval(activity)

  const categoryStyle = getCategoryStyle(activity.category) 

  return (
    <div className={`${styles.activityContainer} ${categoryStyle}`} ref={ref} style={style} onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff}>
        {timeInterval && (<p>{timeInterval}</p>)}
        <h3>{activity.name}</h3>
        <p className={styles.activityDescription}>{activity.description}</p>
        {!timeInterval && <p className={styles.activityDuration}>{activity.durationMinutes} mins</p>}
        {hoverState && <Trash onClick={() => onTrashClick(activity)} className={styles.trashButton}/>}
    </div>
  )
}

export default ActivityBlock