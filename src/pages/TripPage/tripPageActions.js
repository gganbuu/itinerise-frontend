export async function newTripPageAction({request, params}) {
    const formData = await request.formData()
    const intent = formData.get("intent")

    switch (intent) {
        case "newActivityAction": {
            const newActivityDetails = Object.fromEntries(formData)
            return await newActivityAction({newActivityDetails, params})
        }
    }
}

async function newActivityAction({ newActivityDetails, params}) {
        const res = await fetch(`/api/trip/${params.tripId}/newactivity`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newActivityDetails),
            crednetials: 'include'
        })

        if (!res.ok) {
            const err = await res.json().catch(() => null)
            return err ?? { errors: [{ message: 'Something went wrong, please try again'}]}
        }

        return null
}
