import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import FilterBar from '../../components/FilterBar/FilterBar'
import FilterButton from '../../components/FilterBar/FilterButton'
import styles from './MyTripsPage.module.css'
import PageButton from '../../components/PageButton/PageButton'
import SearchBar from '../../components/SearchBar/SearchBar'
import TripCardsContainer from '../../components/TripCardsContainer/TripCardsContainer'
import TripCard from '../../components/TripCard/TripCard'
import NewTripCard from '../../components/NewTripCard/NewTripCard'
import NewTripModal from '../../components/NewTripModal/NewTripModal'
import FooterBar from '../../components/FooterBar/FooterBar'
import { Logo } from '../../components/Logo/Logo'

import { Link } from 'react-router'
import { useState } from 'react'


const MyTripsPage = () => {
  const [modalState, setModalState] = useState(false)
  const toggleModal = () => {
    setModalState(!modalState)
  }

  // temporary trips parser
  const tripsJSON = localStorage.trips ?? `{"undefined": true}`;
  const tripsList = JSON.parse(tripsJSON)
  

  return (
    <div className={styles.myTripsContainer}>
      <NavBar>
        <Link className={styles.logoLink} to="/"><Logo/></Link>
      </NavBar>
      <main className={styles.myTripsMain}>
        <h1>My Trips</h1>
        <FilterBar>
          <div className={styles.tabCluster}>
            <FilterButton name="All"/>
            <FilterButton name="Upcoming"/>
            <FilterButton name="Past"/>
          </div>

          <div className={styles.buttonCluster}>
            <PageButton name="New trip" onClick={() => toggleModal()}/>
            <SearchBar/>
          </div>
        </FilterBar>

        <TripCardsContainer>
          <NewTripCard onClick={() => toggleModal()}/>
          {!tripsList.undefined && tripsList.map(trip => <TripCard key={trip.id} trip={trip}/>)}
        </TripCardsContainer>
        
        {modalState && (<NewTripModal onClose={toggleModal}/>)}
      </main>
      <FooterBar/>
    </div>
  )
}

export default MyTripsPage;