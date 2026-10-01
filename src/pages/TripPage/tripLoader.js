export async function tripLoader({params}) {
    const id = params.tripId;
    const res = await fetch(`/api/mytrips/${id}`);
    return res;
}