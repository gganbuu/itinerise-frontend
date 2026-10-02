import { useLoaderData, Link } from 'react-router'
import styles from './TripPage.module.css';
import NavBar from '../../components/NavBar/NavBar';
import { Logo } from '../../components/Logo/Logo';
import FooterBar from '../../components/FooterBar/FooterBar';
import PageButton from '../../components/PageButton/PageButton';
import { useState } from 'react';
import NewActivityModal from '../../components/NewActivityModal/NewActivityModal';
import getDaysFromTrip from '../../utils/getDaysFromTrip';
import CalendarColumn from '../../components/CalendarColumn/CalendarColumn';

const TripPage = () => {
  const [modalState, setModalState] = useState(false)
  const toggleModal = () => {
    setModalState(!modalState)
  }
  const {acitivity, trip } = useLoaderData();
  const dates = getDaysFromTrip(trip.startDate, trip.endDate);


  
  return (
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
            <div className={styles.container}>
              <p className={styles.containerSubtitle}>ACTIVTY BANK</p>
            </div>
          </aside>

          <aside className={styles.calendarContainer}>
            <div className={styles.calendarGrid}>
              {dates.map(date => <CalendarColumn key={date} date={date}/>)}
            </div>
          </aside>
        </main>

      </main>

      {modalState && (<NewActivityModal onClose={toggleModal}/>)}

      <FooterBar/>
    </div>
  )
}

export default TripPage
