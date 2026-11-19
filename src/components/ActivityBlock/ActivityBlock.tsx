import { useState, type CSSProperties } from 'react';
import styles from './ActivityBlock.module.css'
import { useDraggable } from '@dnd-kit/react'
import type { Activity, ActivityDragData } from '../../types/types'
import { Trash } from 'lucide-react';
import { ACTIVITY_DRAG_TYPE, SLOT_HEIGHT_PX } from '../../constants/calendar';
import { getTimeInterval } from '../../utils/getTimeInterval';
import { durationToRowSpan } from '../../utils/calendarGrid';

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
  const { ref, isDragging } = useDraggable({
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

  const draggedStyle = isDragging ? {height: durationToRowSpan(activity.durationMinutes) * SLOT_HEIGHT_PX, width: `180px`} : {};

  const timeInterval = getTimeInterval(activity.startTime, activity.durationMinutes)

  const categoryStyle = getCategoryStyle(activity.category) 

  return (
    <div className={`${styles.activityContainer} ${categoryStyle}`} ref={ref} style={{...style, ...draggedStyle}} onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff}>
        {timeInterval && (<p>{timeInterval}</p>)}
        <h3>{activity.name}</h3>
        <p className={styles.activityDescription}>{activity.description}</p>
        {!timeInterval && <p className={styles.activityDuration}>{activity.durationMinutes} mins</p>}
        {hoverState && <Trash onClick={() => onTrashClick(activity)} className={styles.trashButton}/>}
    </div>
  )
}

export default ActivityBlock