import { CSSProperties } from 'react';
import styles from './ActivityBlock.module.css'
import { useDraggable } from '@dnd-kit/react'
import type { Activity } from '../../types/types'

interface ActivityBlockProps {
  activity: Activity;
  style?: CSSProperties;
}

const ActivityBlock = ({activity, style}: ActivityBlockProps) => {
  const { ref } = useDraggable({
    id: activity.id
  })
  return (
    <div className={styles.activityContainer} ref={ref} style={style}>
        <p>{activity.durationMinutes} min</p>
        <p>{activity.name}</p>
        <p className={styles.activityDescription}>{activity.description}</p>
    </div>
  )
}

export default ActivityBlock