import React from 'react'
import styles from './Activity.module.css'
import { useDraggable } from '@dnd-kit/react'


const Activity = ({activity, style}) => {
  const id = activity.id;
  const { ref } = useDraggable({
    id: id
  })
  return (
    <div className={styles.activityContainer} ref={ref} style={style}>
        <p>{activity.durationMinutes}</p>
        <p>{activity.name}</p>
        <p className={styles.activityDescription}>{activity.description}</p>
    </div>
  )
}

export default Activity