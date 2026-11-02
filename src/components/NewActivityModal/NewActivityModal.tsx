import styles from "./NewActivityModal.module.css"
import { Form, useActionData } from "react-router"
import TextInput from "../A_Inputs/TextInput/TextInput"
import NumberInput from "../A_Inputs/NumberInput/NumberInput"
import SecondaryButton from "../A_Buttons/SecondaryButton/SecondaryButton"
import PageButton from "../A_Buttons/PageButton/PageButton"
import type { newTripPageAction } from "../../pages/TripPage/tripPageActions"
import CategoryDropdown from "../A_Inputs/CategoryDropdown/CategoryDropdown"

interface NewActivityModalProps {
    onClose: () => void;
}

const NewActivityModal = ({onClose}: NewActivityModalProps) => {
    const actionData = useActionData<typeof newTripPageAction>();
    return (
        <Form method="post" className={styles.newTripModal}>
            <div className={styles.newTripContainer}>
                <header>
                    <div className={styles.newTripTitleAndButton}>
                        <h2>New Activity</h2>
                        <button type="button" onClick={onClose}>x</button>
                    </div>
                    {actionData?.errors.map(err => <p key={err.message}>{err.message}</p>)}
                </header>
                <hr />
                <main className={styles.newTripMain}> 
                    <label className={styles.modalLabel} htmlFor="activityName">Activity name
                        <TextInput id="activityName" name="name" placeholder="the best activity ever"/>
                    </label>
                    <div className={styles.twoColumn}>
                        <label className={styles.modalLabel} htmlFor="activityCategory">Category
                            <CategoryDropdown id="activityCategory"/>
                        </label>
                        <label className={styles.modalLabel} htmlFor="activityLocation">Location
                            <TextInput id="activityLocation" name="location" placeholder="Timbuktoo" />
                        </label>
                    </div>
                    <div className={styles.twoColumn}>
                        <label className={styles.modalLabel} htmlFor="activityDuration">Duration (hr)
                            <NumberInput id="activityDuration" name="duration" placeholder="1hr" step='0.25' />
                        </label>
                        <label className={styles.modalLabel} htmlFor="activityCost">Cost
                            <NumberInput id="activityCost" name="cost" placeholder="$ 100" step='0.01'/>
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
                                intent="newActivityAction"/>
                </footer>
            </div>
        </Form>
    )
}

export default NewActivityModal;
