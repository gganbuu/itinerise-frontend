import ActivityBlock from '../ActivityBlock/ActivityBlock'
import { useDroppable } from '@dnd-kit/react'
import styles from './ActivityBank.module.css'
import type { Activity } from '../../types/types'
import { ACTIVITY_BANK_ID } from '../../constants/calendar'

interface ActivityBankProps {
    activities: Activity[];
    openDeleteModal: (activity: Activity) => void;
}

const ActivityBank = ({activities, openDeleteModal}: ActivityBankProps) => {
    const { ref } = useDroppable({id: ACTIVITY_BANK_ID})
    return (
        <div className={styles.container} ref={ref}>
            <p className={styles.containerSubtitle}>ACTIVTY BANK</p>
            {activities.map(activity => <ActivityBlock key={activity.id} activity={activity} onTrashClick={() => openDeleteModal(activity)}/>)}
        </div>
    )
}

export default ActivityBank