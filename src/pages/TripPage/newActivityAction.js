import { render } from "react-router";
import { createTrip } from "../../data/trips";

export async function newActivityAction({ request }) {
    const formData = await request.formData();

    const activityDetails = {
        name: formData.get("name"),
        category: formData.get("category"),
        destination: formData.get("destination"),
        duration: formData.get("duration"),
        cost: formData.get("cost"),
    }

    const newActivity = createActivity(activityDetails)

    return render()
}