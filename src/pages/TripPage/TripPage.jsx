// react
import { useState } from 'react';
// libraries
import { useLoaderData, Link, useSubmit, useFetchers } from 'react-router'
import { DragDropProvider } from '@dnd-kit/react';
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

//utility functions
import getDaysFromTrip from '../../utils/getDaysFromTrip';
import { isScheduled } from "../../utils/isScheduled"


const TripPage = () => {
  const [modalState, setModalState] = useState(false)
  const toggleModal = () => { setModalState(!modalState)}
  const submit = useSubmit() // submit hook for submitting data without form 
  const fetchers = useFetchers() // for exposing requests that are still in flight (optimistic loading)
  
  const trip = useLoaderData();
  const dates = getDaysFromTrip(trip.startDate, trip.endDate); //returns PlainDate[]


  //optimistic ui
  const getPendingMoves = () => {
    // get all moveactivity requests that are inflight
    const moveActivityRequests = fetchers.filter(req => req.formData?.get('intent') === 'moveActivity')
    // map moveactivity requests to [activityId, startTime]
    const activityTimeArrayValues = moveActivityRequests.map(f => [f.formData.get('activityId'), f.formData.get('startTime') || null])
    // turn array values into keyvalues
    return Object.fromEntries(activityTimeArrayValues)
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
  const activitiesCalendared = (date) => activities
        .filter(isScheduled)
        .filter(a => Temporal.Instant.from(a.startTime).toZonedDateTimeISO('UTC').toPlainDate().equals(date));


  const handleDragEnd = (e) => {
        try {
          // early return if the drag is cancelled 
          if (e.canceled) return;

          // grab the source (draggable) comp and target (droppable) comp
          const { source, target } = e.operation;

          // early return if there is no droppable target
          if (!target) return;

          let startTime
          
          // check if target id is activity bank
          if (target.id === 'activityBank') {
            // if activity bank, set startTime to empty string
            startTime = '';
          } 
          
          // check if the target's type is a timeslot
          else if (target.type === 'timeSlot') {
            // const { date, startMinutes } = target.data as TimeSlotData
            // check if the time overlaps with any activities and early return if it does 
            // 
            // ** 

            const newDate = target.data.date
            const newDateTime = Temporal.PlainDateTime.from(newDate).add({minutes: target.data.startMinutes})
            startTime = newDateTime.toZonedDateTime('UTC').toInstant().toString()
          } 
          // early return if types / id doesn't match any codnitions
          else {
            return
          }

          // update the activity based on the user interaction 
          submit(
            { intent: 'moveActivity', activityId: source.id, tripId: trip.id, startTime },
            { method: 'post', navigate: false, fetcherKey: `move-${source.id}` }
          )
        } catch (error) {
          console.error(error)
        }
        
      }

  return (
    <DragDropProvider onDragEnd={(e) => handleDragEnd(e)}>
      <div className={styles.tripPageWrapper}>
        <NavBar>
          <div className={styles.navLinks}>
            <Link className={styles.logoLink} to="/"><Logo/></Link>
            <Link>Calendar</Link>
            <Link>Budget</Link>
            <Link>Map</Link>
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
                                                  //  date={date.toString()}
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
