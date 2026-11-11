// libraries
import { useLoaderData, Link, useSearchParams } from 'react-router'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import type { Temporal } from 'temporal-polyfill';
// components
import styles from './TripPage.module.css';
import NavBar from '../../components/NavBar/NavBar';
import { Logo } from '../../components/Logo/Logo';
import FooterBar from '../../components/FooterBar/FooterBar';
import PageButton from '../../components/A_Buttons/PageButton/PageButton';
import NewActivityModal from '../../components/NewActivityModal/NewActivityModal';
import CalendarColumn from '../../components/CalendarColumn/CalendarColumn';
import ActivityBank from '../../components/ActivityBank/ActivityBank';
import type { tripLoader } from './tripLoader';

import type { Activity, ActivityDragData } from '../../types/types';


//utility functions
import getDaysFromTrip from '../../utils/getDaysFromTrip';
import { isScheduled } from "../../utils/isScheduled"
import DeleteActivityModal from '../../components/DeleteActivityModal/DeleteActivityModal';
import { getDropDestination } from './getDropDestination';
import { useMoveActivity } from '../../hooks/useMoveActivity';
import { useOptimisticActivities } from '../../hooks/useOptimisticActivities';
import { toPlainDate } from '../../utils/toPlainDate';
import { findOverlappingActivity } from '../../utils/findOverlappingActivity';


const TripPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isNewActivityModalOpen = searchParams.has("newActivity")
  const isDeleteActivityModalOpen = searchParams.has("deleteActivity")

  const openDeleteModal = (activity: Activity) => {
    setSearchParams({deleteActivity: String(activity.id)})
  }

  const openActivityModal = () => {
    setSearchParams({newActivity: "true"})
  }

  const closeActivityModal = () => {
    setSearchParams({})
  }


  const moveActivity = useMoveActivity()  // submit hook for submitting data without form 
  
  const trip = useLoaderData<typeof tripLoader>();
  const dates: Temporal.PlainDate[] = getDaysFromTrip(trip.startDate, trip.endDate); //returns PlainDate[]

  const activityToDelete = trip.activities.find(activity => String(activity.id) == searchParams.get("deleteActivity"))

  //optimistic ui
  const activities = useOptimisticActivities(trip.activities)
  
  // gets all banked activites by checking if activity has a starttime
  const bankedActivities = activities.filter(a => !isScheduled(a))
  const scheduledActivites = activities.filter(isScheduled)
  
  const activitiesOn = (date: Temporal.PlainDate) => scheduledActivites.filter(a => toPlainDate(a.startTime).equals(date))

  const handleDragEnd = ({ canceled, operation }: DragEndEvent) => {
    const { source, target } = operation
    if (canceled || !source || !target) return

    const {activity} = source.data as ActivityDragData

    const destination = getDropDestination(target)
    if (!destination) return

    if (destination.kind === 'bank') {
      moveActivity(activity, null)
      return
    }
    const overlapping = findOverlappingActivity(activity, destination.startTime, activities)
    if (overlapping) return

    moveActivity(activity, destination.startTime)
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
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
              <PageButton name="New Activity" onClick={openActivityModal}/>
              <div className={styles.container}>
                <p className={styles.containerSubtitle}>CATEGORIES</p>
              </div>
              <ActivityBank activities={bankedActivities} openDeleteModal={openDeleteModal}/>
            </aside>

            <aside className={styles.calendarContainer}>
              <div className={styles.calendarGrid}>
                {dates.map(date => <CalendarColumn key={date.toString()} 
                                                  date={date}
                                                  activities={activitiesOn(date)}
                                                  openDeleteModal={openDeleteModal}/>)}
              </div>
            </aside>
          </main>

        </main>

        {isNewActivityModalOpen && (<NewActivityModal onClose={closeActivityModal}/>)}

        {isDeleteActivityModalOpen && (<DeleteActivityModal activity={activityToDelete} onClose={closeActivityModal}/>)}

        <FooterBar/>
      </div>
    </DragDropProvider>
  )
}

export default TripPage
