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
import { useLoaderData } from 'react-router'
import type myTripsLoader from './myTripsLoader'
import DeleteTripModal from '../../components/DeleteTripModal/DeleteTripModal'
import type { TripSummary } from '../../types/types'

import { useSearchParams } from 'react-router'

const MyTripsPage = () => {
  // loader
  const trips = useLoaderData<typeof myTripsLoader>()

  // hooks
  const [searchParams, setSearchParams] = useSearchParams()
  const [newTripModalState, setNewTripModalState] = useState<boolean>(false)
  
  const deleteTripId = searchParams.get("deleteTrip")
  const tripToDelete = trips.find(trip => String(trip.id) === deleteTripId)
  
  const toggleNewTripModal = () => {
    setNewTripModalState(prev => !prev)
  }
  const openTrashModal = (trip: TripSummary) => {
    setSearchParams({ deleteTrip: String(trip.id)})
  }
  const closeTrashModal = () => {
    setSearchParams({})
  }
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
            <PageButton name="New trip" onClick={() => toggleNewTripModal()}/>
            <SearchBar/>  
          </div>
        </FilterBar>

        <TripCardsContainer>
          <NewTripCard onClick={() => toggleNewTripModal()}/>
          {trips?.length > 0 && trips.map(trip => <TripCard key={trip.id} trip={trip} onTrashToggle={() => openTrashModal(trip)}/>)}
        </TripCardsContainer>
        
        {newTripModalState && (<NewTripModal onClose={toggleNewTripModal}/>)}

        {tripToDelete && (<DeleteTripModal onClose={closeTrashModal} trip={tripToDelete}/>)}
        
  
      </main>
      <FooterBar/>
    </div>
  )
}

export default MyTripsPage;