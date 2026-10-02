export const newActivityAction = async ({request, params}) => {
    const data = await request.formData()
    const newActivityDetails = Object.fromEntries(data)
    
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