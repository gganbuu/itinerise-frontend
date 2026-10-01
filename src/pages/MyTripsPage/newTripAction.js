import { redirect} from "react-router";

export async function newTripAction({ request }) {
    const body = await request.formData()
    const newTripDetails = Object.fromEntries(body)

    const res = await fetch('/api/mytrips/newtrip', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newTripDetails),
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json().catch(() => null)
        return data ?? {errors: [{message: 'Something went wrong, please try again'}]}
    }

    return redirect('/')
}