import { redirect } from "react-router";
import { createTrip } from "../../data/trips"

export async function newTripAction({ request }) {
    const formData = await request.formData();

    const tripDetails = {
        name: formData.get("name"),
        destination: formData.get("destination"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
    }

    const newTrip = createTrip(tripDetails);

    return redirect(`/trip/${newTrip.id}`);
}