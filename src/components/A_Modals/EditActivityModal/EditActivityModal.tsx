import type { Activity } from '../../../types/types'
import styles from './EditActivityModal.module.css'
import { Form } from 'react-router'
import TextInput from '../../A_Inputs/TextInput/TextInput'
import CategoryDropdown from '../../A_Inputs/CategoryDropdown/CategoryDropDown'
import NumberInput from '../../A_Inputs/NumberInput/NumberInput'
import TextArea from '../../A_Inputs/TextArea/TextArea'
import SecondaryButton from '../../A_Buttons/SecondaryButton/SecondaryButton'
import PageButton from '../../A_Buttons/PageButton/PageButton'

interface EditActivityProps {
    activity: Activity | undefined,
    onClose: () => void
}

const EditActivityModal = ({activity, onClose}: EditActivityProps) => {
  return (
    <Form method="post" className={styles.newTripModal}>
            <div className={styles.newTripContainer}>
                <header>
                    <div className={styles.newTripTitleAndButton}>
                        <h2>Edit Activity</h2>
                        <button type="button" onClick={onClose}>x</button>
                    </div>
                </header>
                <hr />
                <main className={styles.newTripMain}> 
                    <label className={styles.modalLabel} htmlFor="activityName">Activity name
                        <TextInput id="activityName" name="name" placeholder="the best activity ever" autoFocus/>
                    </label>
                    <div className={styles.twoColumn}>
                        <label className={styles.modalLabel} htmlFor="activityCategory">Category
                            <CategoryDropdown id="activityCategory"/>
                        </label>
                        <label className={styles.modalLabel} htmlFor="activityLocation">Location
                            <TextInput id="activityLocation" name="location" placeholder="Timbuktoo"/>
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
                        <TextArea id="activityDescription" name="description" placeholder="the best activity ever"/>
                    </label>

                </main>
                <hr />
                <footer>
                    <SecondaryButton name="Cancel" onClick={onClose} />
                    <PageButton type="button"
                                name="Delete"/>
                    <PageButton type="submit" 
                                name="Submit"
                                intent="editActivityAction"/>
                </footer>
            </div>
        </Form>
  )
}

export default EditActivityModal