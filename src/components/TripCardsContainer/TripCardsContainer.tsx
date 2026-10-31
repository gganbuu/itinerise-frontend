import styles from './TripCardsContainer.module.css'
import type { ReactNode } from 'react'


interface TripCardsContainerProps {
  children?: ReactNode
}

const TripCardsContainer = ({children}: TripCardsContainerProps) => {
  return (
    <div className={styles.tripCardsContainer}>
        {children}
    </div>
  )
}

export default TripCardsContainer