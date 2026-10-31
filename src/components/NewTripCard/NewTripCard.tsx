import type { MouseEventHandler } from 'react'
import styles from './NewTripCard.module.css'


interface NewTripCardProps {
  onClick: MouseEventHandler<HTMLButtonElement> 
}

const NewTripCard = ({onClick}: NewTripCardProps) => {
  return (
    <button className={styles.newTripCard} onClick={onClick}>
      <span className={styles.plusBadge}>
        <svg className={styles.plusIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </span>
      <p className={styles.newTripLabel}>Plan a new trip</p>
    </button>
  )
}

export default NewTripCard
