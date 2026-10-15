import type { TripSummary } from "../../types/types"

export default async function myTripsLoader(): Promise<TripSummary[]> {
    const res = await fetch('/api/mytrips/all')
    if (!res.ok) throw new Response('Could not load messages', {status: res.status})
    return (await res.json()) as TripSummary[]
}