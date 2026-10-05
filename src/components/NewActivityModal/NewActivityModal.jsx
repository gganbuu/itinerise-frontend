import styles from "./NewActivityModal.module.css"
import { Form, useNavigation } from "react-router"
import TextInput from "../TextInput/TextInput"
import SecondaryButton from "../SecondaryButton/SecondaryButton"
import PageButton from "../PageButton/PageButton"
import DateInput from "../DateInput/DateInput"


const NewActivityModal = ({onClose}) => {
    
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
                        <label className={styles.modalLabel} htmlFor="activityLocation">Location
                            <TextInput id="activityLocation" name="location" placeholder="Timbuktoo" />
                        </label>
                    </div>
                    <div className={styles.twoColumn}>
                        <label className={styles.modalLabel} htmlFor="activityDuration">Duration (hr)
                            <TextInput id="activityDuration" name="duration" placeholder="1hr" />
                        </label>
                        <label className={styles.modalLabel} htmlFor="activityCost">Cost
                            <TextInput id="activityCost" name="cost" placeholder="$ 100" />
                        </label>
                    </div>
                    <label className={styles.modalLabel} htmlFor="activityDescription">Description
                        <TextInput id="activityDescription" name="description" placeholder="the best activity ever"/>
                    </label>

                </main>
                <hr />
                <footer>
                    <SecondaryButton name="Cancel" onClick={onClose} />
                    <PageButton type="submit" 
                                name="Submit"
                                intent={true}
                                value="newActivityAction"/>
                </footer>
            </div>
        </Form>
    )
}

export default NewActivityModal;
