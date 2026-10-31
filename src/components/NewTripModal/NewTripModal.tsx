import styles from "./NewTripModal.module.css"
import { Form, useNavigation } from "react-router"
import TextInput from "../TextInput/TextInput"
import SecondaryButton from "../SecondaryButton/SecondaryButton"
import PageButton from "../PageButton/PageButton"
import DateInput from "../DateInput/DateInput"
import { useState } from "react"
import type { ChangeEvent } from "react"

interface NewTripModalProps {
    onClose: () => void
}


const NewTripModal = ({onClose}: NewTripModalProps) => {
    const navigation = useNavigation();
    const [tripStartDate, setTripStartDate] = useState('')
    const isSubmitting = navigation.state === "submitting";

    const handleTripStartDate = (e: ChangeEvent<HTMLInputElement>) => {
        setTripStartDate(e.target.value)
    }
    
    return (
        <Form method="POST" className={styles.newTripModal}>
            <div className={styles.newTripContainer}>
                <header>
                    <div className={styles.newTripTitleAndButton}>
                        <button onClick={onClose} type="button">x</button>
                    </div>
                    <p className={styles.newTripSubtitle}>add your vacation details here</p>
                </header>
                <hr />
                <main className={styles.newTripMain}> 
                    <label className={styles.modalLabel} htmlFor="tripName">Trip name
                        <TextInput id="tripName" name="name" placeholder="the best trip ever"/>
                    </label>
                    <label className={styles.modalLabel} htmlFor="tripDestination">Destination
                        <TextInput id="tripDestination" name="destination" placeholder="Timbuktoo" />
                    </label>
                    <div className={styles.dateLabel}>
                        <label className={styles.modalLabel} htmlFor="tripStartDate">Start Date
                            <DateInput id="tripStartDate" name="startDate" required onChange={(e) => handleTripStartDate(e)}/>
                        </label>
                        <label className={styles.modalLabel} htmlFor="tripEndDate">End Date
                            <DateInput id="tripEndDate" name="endDate" required min={tripStartDate}/>
                        </label>
                    </div>
                </main>
                <hr />
                <footer>
                    <SecondaryButton name="Cancel" onClick={onClose} />
                    <PageButton type="submit" 
                                name={isSubmitting ? "Creating...": "Create trip"}/>
                </footer>
            </div>
        </Form>
    )
}

export default NewTripModal;
