import styles from "./NewActivityModal.module.css"
import { Form, useNavigation } from "react-router"
import TextInput from "../TextInput/TextInput"
import SecondaryButton from "../SecondaryButton/SecondaryButton"
import PageButton from "../PageButton/PageButton"
import DateInput from "../DateInput/DateInput"


const NewActivityModal = ({onClose}) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    
    return (
        <Form method="post" className={styles.newTripModal}>
            <div className={styles.newTripContainer}>
                <header>
                    <div className={styles.newTripTitleAndButton}>
                        <h2>New Activity</h2>
                        <button onClick={onClose}>x</button>
                    </div>
                </header>
                <hr />
                <main className={styles.newTripMain}> 
                    <label className={styles.modalLabel} htmlFor="activityName">Activity name
                        <TextInput id="activityName" name="name" placeholder="the best activity ever"/>
                    </label>
                    <div className={styles.twoColumn}>
                        <label className={styles.modalLabel} htmlFor="activityCategory">Category
                            <TextInput id="activityCategory" name="category" placeholder="Food" />
                        </label>
                        <label className={styles.modalLabel} htmlFor="activityDestination">Location
                            <TextInput id="activityDestination" name="destination" placeholder="Timbuktoo" />
                        </label>
                    </div>
                    <div className={styles.twoColumn}>
                        <label className={styles.modalLabel} htmlFor="tripStartDate">Duration
                            <TextInput id="activityDuration" name="duration" placeholder="1hr" />
                        </label>
                        <label className={styles.modalLabel} htmlFor="tripEndDate">Cost
                            <TextInput id="activityCost" name="cost" placeholder="$ 100" />
                        </label>
                    </div>
                </main>
                <hr />
                <footer>
                    <SecondaryButton name="Cancel" onClick={onClose} />
                    <PageButton type="submit" 
                                name={isSubmitting ? "Creating...": "Create Activity"}/>
                </footer>
            </div>
        </Form>
    )
}

export default NewActivityModal;
