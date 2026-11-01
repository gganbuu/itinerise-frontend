import { Form } from "react-router"
import styles from "./DeleteTripModal.module.css"
import PageButton from "../PageButton/PageButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import type { TripSummary } from "../../types/types";

interface DeleteTripModalProps {
    onClose: () => void;
    trip: TripSummary
}

const DeleteTripModal = ({onClose, trip}: DeleteTripModalProps) => {
  return (
    <Form className={styles.deleteTripModal}>
        <div className={styles.deleteTripContainer}>
          <header>
              <div className={styles.deleteTripTitleAndButton}>
                  <h2>Delete "{trip.name}"?</h2>
                  <button type="button" onClick={onClose}>x</button>
              </div>
          </header>
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

export default DeleteTripModal