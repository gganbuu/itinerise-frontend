import React from 'react'
import Activity from '../Activity/Activity'
import { useDroppable } from '@dnd-kit/react'
import styles from './ActivityBank.module.css'

const ActivityBank = ({activities, activityPlacements}) => {
    const { ref } = useDroppable({id: 'activityBank'})
    return (
        <div className={styles.container} ref={ref}>
            <p className={styles.containerSubtitle}>ACTIVTY BANK</p>
            {activities.filter(activity => !activityPlacements[activity.id] || activityPlacements[activity.id] === 'activityBank')
                       .map(activity => <Activity key={activity.id} activity={activity}/>)}
        </div>
    )
}

export default ActivityBank