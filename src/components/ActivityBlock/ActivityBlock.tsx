import { useState, type CSSProperties } from 'react';
import styles from './ActivityBlock.module.css'
import { useDraggable } from '@dnd-kit/react'
import type { Activity } from '../../types/types'
import { Trash } from 'lucide-react';

interface ActivityBlockProps {
  activity: Activity;
  style?: CSSProperties;
  onTrashClick: (activity: Activity) => void;
}

const ActivityBlock = ({activity, style, onTrashClick}: ActivityBlockProps) => {
  const [hoverState, setHoverState] = useState<boolean>(false)
  const handleHoverOn = () => {
    setHoverState(true)
  }
  const handleHoverOff = () => {
    setHoverState(false)
  }
  const { ref } = useDraggable({
    id: activity.id
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