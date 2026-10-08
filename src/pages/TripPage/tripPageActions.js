export async function newTripPageAction({request, params}) {
    const formData = await request.formData()
    const intent = formData.get("intent")

    switch (intent) {
        case "newActivityAction": {
            return await newActivityAction({formData, params})
        }
        case "moveActivity": {
            return await moveActivityAction({formData, params})
        }

    }
}

async function newActivityAction({ formData, params}) {
        const newActivityDetails = Object.fromEntries(formData)
        const res = await fetch(`/api/trip/${params.tripId}/newactivity`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newActivityDetails),
            credentials: 'include'
        })

        if (!res.ok) {
            const err = await res.json().catch(() => null)
            return err ?? { errors: [{ message: 'Something went wrong, please try again'}]}
        }

        return null
}

async function moveActivityAction({ formData, params }) {
    const activityId = formData.get("activityId")
    const tripId = formData.get("tripId")
    const startTime = formData.get("startTime") || null

    const res = await fetch(`/api/trip/${tripId}/settime/${activityId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({startTime}),
        credentials: 'include',
    })

    if (!res.ok) return ( errors [{ message: 'Could not move activity'}])
        return null
}