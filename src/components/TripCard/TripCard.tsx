import styles from './TripCard.module.css'
import shapes from '../../assets/Shapes.svg'
import { Link } from 'react-router'
import { toPlainDate } from '../../utils/toPlainDate'
import type { TripSummary } from '../../types/types'
import { Temporal } from 'temporal-polyfill'


const daysBetween = (from: Temporal.PlainDate, to: Temporal.PlainDate)  => {
  return from.until(to, { largestUnit: 'day'}).days
}

const formatDay = (date: Temporal.PlainDate) => date.toLocaleString('en-US', {day: 'numeric', month: 'short'})

const formatCountdown = (start: Temporal.PlainDate, end: Temporal.PlainDate) => {
  const today = Temporal.Now.plainDateISO()
  const daysToStart = daysBetween(today, start)

  if (daysToStart > 1) return `in ${daysToStart} days`
  if (daysToStart === 1) return 'tomorrow'
  if (daysToStart === 0) return 'today'
  if (daysBetween(today, end) >= 0) return 'in progress'
  return 'completed'
}

interface TripCardProps {
  trip: TripSummary
}


const TripCard = ({trip}: TripCardProps) => {
  const startDate: Temporal.PlainDate = toPlainDate(trip.startDate)
  const endDate: Temporal.PlainDate = toPlainDate(trip.endDate)
  const days = daysBetween(startDate, endDate) + 1

  return (
    <Link to={`/trip/${trip.id}`} className={styles.linkWrap}>
      <article className={styles.tripCard}>
        <div className={styles.tripRoute}>
          <img src={shapes} alt="" className={styles.routeLine}/>
        </div>

        <div className={styles.tripDetails}>
          <h3 className={styles.tripName}>{trip.name}</h3>
          <p className={styles.tripDates}>
            {formatDay(startDate)} — {formatDay(endDate)} • {days} days
          </p>
          <p className={styles.tripCountdown}>{formatCountdown(startDate, endDate)}</p>
        </div>
      </article>
    </Link>
  )
}

export default TripCard
