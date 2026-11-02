import { Form, useActionData } from "react-router"
import type { myTripsPageAction } from "../../pages/MyTripsPage/myTripsPageAction";
import styles from "./DeleteTripModal.module.css"
import PageButton from "../PageButton/PageButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import type { TripSummary } from "../../types/types";

interface DeleteTripModalProps {
    onClose: () => void;
    trip: TripSummary
}

const DeleteTripModal = ({onClose, trip}: DeleteTripModalProps) => {
  const actionData = useActionData<typeof myTripsPageAction>()
  return (
    <Form method="post" className={styles.deleteTripModal}>
        <div className={styles.deleteTripContainer}>
          <header>
              <div className={styles.deleteTripTitleAndButton}>
                  <h2>Delete "{trip.name}"?</h2>
                  <button type="button" onClick={onClose}>x</button>
                  <input type="hidden" name="id" value={trip.id}/>
              </div>
          </header>
          <hr />
          {actionData?.errors.map(err => <p key={err.message}>{err.message}</p>)}  
          <footer>
              <SecondaryButton name="Cancel" onClick={onClose} />
              <PageButton type="submit"
                          name="Submit"
                          intent="deleteTripAction"
                          />
          </footer>
        </div>
    </Form>
  )
}

export default DeleteTripModal