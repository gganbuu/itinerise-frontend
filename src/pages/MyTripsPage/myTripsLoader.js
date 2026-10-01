export default async function myTripsLoader() {
    const res = await fetch('/api/mytrips/all')
    if (!res.ok) throw new Response('Could not load messages', {status: res.status})
    return res.json()

}