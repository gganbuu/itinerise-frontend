import type { LoaderFunctionArgs } from "react-router";
import type { Trip } from "../../types/types";

export async function tripLoader({ params }: LoaderFunctionArgs): Promise<Trip> {
    const {tripId} = params;

    if ( !tripId ) throw new Response("Trip not found", { status: 404})

    const res = await fetch(`/api/trip/${tripId}`)
    if (!res.ok) throw new Response("Trip not found", { status: res.status });
    return ( await res.json()) as Trip;
}
