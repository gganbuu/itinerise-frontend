export async function tripLoader({ params }) {
    const id = params.tripId;
    const [tripRes, activitiesRes] = await Promise.all([
        fetch(`/api/trip/${id}`),
        fetch(`/api/trip/${id}/allactivities`),
    ]);
    if (!tripRes.ok) throw new Response("Trip not found", { status: tripRes.status });
    return { trip: await tripRes.json(), activities: await activitiesRes.json() };
}
