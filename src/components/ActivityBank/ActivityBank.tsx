import ActivityBlock from '../ActivityBlock/ActivityBlock'
import { useDroppable } from '@dnd-kit/react'
import styles from './ActivityBank.module.css'
import type { Activity } from '../../types/types'

interface ActivityBankProps {
    activities: Activity[];
}

const ActivityBank = ({activities}: ActivityBankProps) => {
    const { ref } = useDroppable({id: 'activityBank'})
    return (
        <div className={styles.container} ref={ref}>
            <p className={styles.containerSubtitle}>ACTIVTY BANK</p>
            {activities.map(activity => <ActivityBlock key={activity.id} activity={activity}/>)}
        </div>
    )
}

export default ActivityBank