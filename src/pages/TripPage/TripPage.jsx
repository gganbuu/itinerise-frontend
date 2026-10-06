// react
import { useState } from 'react';
// libraries
import { useLoaderData, Link } from 'react-router'
import { useDroppable, DragDropProvider } from '@dnd-kit/react';
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
import { isValidDate } from '../../utils/isValidDate';
import { toShortDate } from '../../utils/toShortDate';


const TripPage = () => {
  const [modalState, setModalState] = useState(false)
  const toggleModal = () => { setModalState(!modalState)}
  
  const [activityPlacements, setActivityPlacements] = useState({});
  const [isDropped, setIsDropped] = useState(false);

  const trip = useLoaderData();
  const dates = getDaysFromTrip(trip.startDate, trip.endDate);
  const activities = trip.activities;
  
  return (
    <DragDropProvider onDragEnd={(e) => {
        if (e.canceled) return;
        const { source, target } = e.operation;
        if (!target) return;

        if (target.id === 'activityBank' || isValidDate(target.id)) {
          setActivityPlacements(prev => ({...prev, [source.id]: target.id}));
        }
        
        setIsDropped(target?.id == 'activityBank' || isValidDate(target?.id));
      }}>
        
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
              <ActivityBank activities={activities} activityPlacements={activityPlacements}/>
            </aside>

            <aside className={styles.calendarContainer}>
              <div className={styles.calendarGrid}>
                {dates.map(date => <CalendarColumn key={date} 
                                                   date={date}
                                                   activities={activities.filter(a => activityPlacements[a.id] === toShortDate(date))}/>)}
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
