import styles from "./DeleteActivityModal.module.css"
import type { Activity } from "../../types/types";
import type { newTripPageAction } from "../../pages/TripPage/tripPageActions";
import { useActionData, Form } from "react-router";
import SecondaryButton from "../A_Buttons/SecondaryButton/SecondaryButton";
import PageButton from "../A_Buttons/PageButton/PageButton";

interface DeleteActivityModalProps {
    activity: Activity | undefined;
    onClose: () => void;
}

const DeleteActivityModal = ({activity, onClose}: DeleteActivityModalProps) => {
  const actionData = useActionData<typeof newTripPageAction>()
  return (
    <Form method="POST" className={styles.deleteActivityModal}>
      <div className={styles.deleteActivityContainer}>
          <header>
              <div className={styles.deleteActivityTitleAndButton}>
                  <h2>Delete "{activity?.name}"?</h2>
                  <button type="button" onClick={onClose}>x</button>
                  <input type="hidden" name="id" value={activity?.id}/>
              </div>
          </header>
          <hr />
          {actionData?.errors.map(err => <p key={err.message}>{err.message}</p>)}  
          <footer>
              <SecondaryButton name="Cancel" onClick={onClose} />
              <PageButton type="submit"
                          name="Submit"
                          intent="deleteActivityAction"
                          />
          </footer>
        </div>

    </Form>
  )
}

export default DeleteActivityModal