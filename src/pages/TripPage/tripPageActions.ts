import type { ActionFunctionArgs} from "react-router"
import type { ActionErrors } from "../../types/types"

export async function newTripPageAction({request, params}: ActionFunctionArgs): Promise<ActionErrors | null> {
    const formData = await request.formData()
    const intent = formData.get("intent")
    
    const { tripId } = params
    if (!tripId) throw new Response("Trip not found", { status: 404})

    switch (intent) {
        case "newActivityAction": {
            return await newActivityAction(formData, tripId)
        }
        case "moveActivity": {
            return await moveActivityAction(formData, tripId)
        }
        default: 
            throw new Response(`Unknown intent: ${intent}`, { status: 400})

    }
}

async function newActivityAction(formData: FormData, tripId: string): Promise<ActionErrors | null>  {
    const newActivityDetails = Object.fromEntries(formData)
    const res = await fetch(`/api/trip/${tripId}/newactivity`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newActivityDetails),
        credentials: 'include'
    })

    if (!res.ok) return { errors: [{ message: 'Something went wrong, please try again'}]}
    return null
}

async function moveActivityAction(formData: FormData, tripId: string): Promise<ActionErrors | null>  {
    const activityId = formData.get("activityId")
    const rawStartTime = formData.get("startTime")
    const startTime = typeof rawStartTime === "string" && rawStartTime !== "" ? rawStartTime : null

    //check if activityId is not null
    if (typeof activityId !== 'string') return { errors: [{message: 'Could move activity'}]}


    const res = await fetch(`/api/trip/${tripId}/settime/${activityId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({startTime}),
        credentials: 'include',
    })

    if (!res.ok) return { errors: [{ message: 'Could not move activity'}]}
    return null
}