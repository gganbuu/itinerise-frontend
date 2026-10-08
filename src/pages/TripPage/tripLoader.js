export async function tripLoader({ params }) {
    const id = params.tripId;
    const trip = await fetch(`/api/trip/${id}`, )
    if (!trip.ok) throw new Response("Trip not found", { status: trip.status });
    return trip;
}
