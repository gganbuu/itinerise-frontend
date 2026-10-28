// react
import { useState} from 'react';
// libraries
import { useLoaderData, Link, useSubmit, useFetchers } from 'react-router'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { Temporal } from 'temporal-polyfill';
// components
import styles from './TripPage.module.css';
import NavBar from '../../components/NavBar/NavBar';
import { Logo } from '../../components/Logo/Logo';
import FooterBar from '../../components/FooterBar/FooterBar';
import PageButton from '../../components/PageButton/PageButton';
import NewActivityModal from '../../components/NewActivityModal/NewActivityModal';
import CalendarColumn from '../../components/CalendarColumn/CalendarColumn';
import ActivityBank from '../../components/ActivityBank/ActivityBank';
import type { tripLoader } from './tripLoader';

import type { TimeSlotData } from '../../types/types';


//utility functions
import getDaysFromTrip from '../../utils/getDaysFromTrip';
import { isScheduled } from "../../utils/isScheduled"


const TripPage = () => {
  const [modalState, setModalState] = useState(false)
  const toggleModal = () => { setModalState(!modalState)}
  const submit = useSubmit() // submit hook for submitting data without form 
  const fetchers = useFetchers() // for exposing requests that are still in flight (optimistic loading)
  
  const trip = useLoaderData<typeof tripLoader>();
  const dates: Temporal.PlainDate[] = getDaysFromTrip(trip.startDate, trip.endDate); //returns PlainDate[]


  //optimistic ui
  const getPendingMoves = (): Record<string, string | null> => {
    const pendingMoves: Record<string, string | null> = {}
    
    for (const fetcher of fetchers)  {
      const formData = fetcher.formData
      if (formData?.get('intent') !== 'moveActivity') continue

      const activityId = formData.get('activityId')
      const startTime = formData.get('startTime')
      
      if (typeof activityId !== 'string') continue

      pendingMoves[activityId] = typeof startTime === 'string' && startTime !== '' ? startTime: null
    }

    return pendingMoves

  }

  const pendingMoves = getPendingMoves()

  const activities = trip.activities.map(a => 
    String(a.id) in pendingMoves ? { ...a, startTime: pendingMoves[a.id]} : a
  )
  
  // gets all banked activites by checking if activity has a starttime
  const activitiesBanked = activities.filter(a => !a.startTime)
  
  // gets all activites on a specific date, checking if:
  // - activity has a start time 
  // - a.startTime is the same date as date.to datestring
  const activitiesCalendared = (date: Temporal.PlainDate) => activities
        .filter(isScheduled)
        .filter(a => Temporal.Instant.from(a.startTime).toZonedDateTimeISO('UTC').toPlainDate().equals(date));


  const handleDragEnd = (e: DragEndEvent) => {
    if (e.canceled) return

    const { source, target } = e.operation
    if (!source || !target) return

    let startTime: string
    if (target.id === 'activityBank') {
      startTime = ''
    } else if (target.type === 'timeSlot') {
      const { date, startMinutes } = target.data as TimeSlotData
      startTime = date.toPlainDateTime()
        .add({ minutes: startMinutes })
        .toZonedDateTime('UTC')
        .toInstant()
        .toString()
    } else {
      return
    }
    submit(
      { intent: 'moveActivity', activityId: source.id, startTime },
      { method: 'post', navigate: false, fetcherKey: `move-${source.id}` }
    )
  }

  return (
    <DragDropProvider onDragEnd={(e) => handleDragEnd(e)}>
      <div className={styles.tripPageWrapper}>
        <NavBar>
          <div className={styles.navLinks}>
            <Link className={styles.logoLink} to="/"><Logo/></Link>
            {/* <Link>Calendar</Link>
            <Link>Budget</Link>
            <Link>Map</Link> */}
          </div>

          <div className={styles.profileAndShare}>

          </div>
        </NavBar>

        <main className={styles.tripPageMain}>
          
          <header className={styles.headingAndButton}>
            <h2>{trip.name}</h2>
            <button>Week</button>
          </header>

          <main className={styles.bubblesContainer}>

            <aside className={styles.sideBar}>
              <PageButton name="New Activity" onClick={toggleModal}/>
              <div className={styles.container}>
                <p className={styles.containerSubtitle}>CATEGORIES</p>
              </div>
              <ActivityBank activities={activitiesBanked}/>
            </aside>

            <aside className={styles.calendarContainer}>
              <div className={styles.calendarGrid}>
                {dates.map(date => <CalendarColumn key={date.toString()} 
                                                  date={date}
                                                   activities={activitiesCalendared(date)}/>)}
              </div>
            </aside>
          </main>

        </main>

        {modalState && (<NewActivityModal onClose={toggleModal}/>)}

        <FooterBar/>
      </div>
    </DragDropProvider>
  )
}

export default TripPage
