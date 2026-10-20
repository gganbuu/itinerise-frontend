import type { LoaderFunctionArgs } from "react-router";
import type { Trip } from "../../types/types";

export async function tripLoader({ params }: LoaderFunctionArgs): Promise<Trip> {
    const id = params.tripId;
    const res = await fetch(`/api/trip/${id}`, )
    if (!res.ok) throw new Response("Trip not found", { status: res.status });
    return ( await res.json()) as Trip;
}
