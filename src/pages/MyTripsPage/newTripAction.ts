import { redirect} from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { ActionErrors } from "../../types/types";
import { Temporal } from "temporal-polyfill";
import { parsePlainDate } from "../../utils/parsePlainDate";


export async function newTripAction({ request }: ActionFunctionArgs): Promise<ActionErrors | Response>{
    const formData = await request.formData()
    
    // getting different fields for new trip database get
    const name = formData.get("name")
    const destination =  formData.get("destination")
    const startDate = formData.get("startDate")
    const endDate = formData.get("endDate")

    console.log(name)

    // check the types of formData gets
    if (
        typeof name !== "string" ||
        typeof destination !== "string" ||
        typeof startDate !== "string" || 
        typeof endDate !== "string" 
    ) return { 
        errors: [{ message: "Please fill all fields"}] 
    }

    //check the start and end date
    const start = parsePlainDate(startDate)
    const end = parsePlainDate(endDate)

    if (!start || !end) {
        return { errors: [{ message: "Please enter valid dates" }] }
    }
    if (Temporal.PlainDate.compare(end, start) < 0) {
        return { errors: [{ message: "End date can't be before the start date" }] }
    }


    // fetch request
    const res = await fetch('/api/mytrips/newtrip', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: name, destination: destination, startDate: startDate, endDate: endDate}),
        credentials: 'include'
    })

    if (!res.ok) return { errors: [{message: 'Something went wrong, please try again'}] }
    
    return redirect('/')
}