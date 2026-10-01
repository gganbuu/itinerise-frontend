import React from 'react'
import styles from './TripCard.module.css'
import shapes from '../../assets/Shapes.svg'
import { Link } from 'react-router'

const dayInMs = 1000 * 60 * 60 * 24

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

const daysBetween = (from, to) => Math.round((startOfDay(to) - startOfDay(from)) / dayInMs)

const formatDay = (date) => date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})

const formatCountdown = (start, end) => {
  const today = new Date()
  const daysToStart = daysBetween(today, start)

  if (daysToStart > 1) return `in ${daysToStart} days`
  if (daysToStart === 1) return 'tomorrow'
  if (daysToStart === 0) return 'today'
  if (daysBetween(today, end) >= 0) return 'in progress'
  return 'completed'
}

const TripCard = ({trip}) => {
  const start = new Date(trip.startDate)
  const end = new Date(trip.endDate)
  const days = daysBetween(start, end) + 1

  return (
    <Link to={`/trip/${trip.id}`} className={styles.linkWrap}>
      <article className={styles.tripCard}>
        <div className={styles.tripRoute}>
          <img src={shapes} alt="" className={styles.routeLine}/>
        </div>

        <div className={styles.tripDetails}>
          <h3 className={styles.tripName}>{trip.name}</h3>
          <p className={styles.tripDates}>
            {formatDay(start)} — {formatDay(end)} • {days} days
          </p>
          <p className={styles.tripCountdown}>{formatCountdown(start, end)}</p>
        </div>
      </article>
    </Link>
  )
}

export default TripCard
