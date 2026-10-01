// temporary data solution before creating database

const STORAGE_KEY = "trips";

function readTrips() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function writeTrips(trips) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips))
}

export function getTrips() {
    return readTrips();
}

export function getTrip(id) {
    return readTrips().find((trip) => trip.id === id);
}

export function createTrip(tripDetails) {
    const newTrip = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...tripDetails,
        activities: [],
    };

    writeTrips([...readTrips(), newTrip]);
    return newTrip;
}

export function createActivity(activityDetails) {
    const newActivity = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...activityDetails
    };


}