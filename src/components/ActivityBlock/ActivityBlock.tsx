import { useState, type CSSProperties } from 'react';
import styles from './ActivityBlock.module.css'
import { useDraggable } from '@dnd-kit/react'
import type { Activity, ActivityDragData } from '../../types/types'
import { Trash } from 'lucide-react';
import { ACTIVITY_DRAG_TYPE } from '../../constants/calendar';

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
  return (
    <div className={styles.activityContainer} ref={ref} style={style} onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff}>
        <h3>{activity.name}</h3>
        <p className={styles.activityDescription}>{activity.description}</p>
        <p className={styles.activityDuration}>{activity.durationMinutes} mins</p>
        {hoverState && <Trash onClick={() => onTrashClick(activity)} className={styles.trashButton}/>}
    </div>
  )
}

export default ActivityBlock