import React from 'react'
import ActivityBlock from '../ActivityBlock/ActivityBlock'
import { useDroppable } from '@dnd-kit/react'
import styles from './ActivityBank.module.css'

const ActivityBank = ({activities}) => {
    const { ref } = useDroppable({id: 'activityBank'})
    return (
        <div className={styles.container} ref={ref}>
            <p className={styles.containerSubtitle}>ACTIVTY BANK</p>
            {activities.map(activity => <ActivityBlock key={activity.id} activity={activity}/>)}
        </div>
    )
}

export default ActivityBank