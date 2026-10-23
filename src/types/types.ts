/* ISO instant from the API, always UTC, e.g. "2026-10-08T09:00:00.000Z*/
export type IsoInstant = string;

export interface Activity {
    id: number;
    tripId: number;
    name: string;
    category: string;
    location: string;
    durationMinutes: number;
    startTime: IsoInstant | null; // null = in activity bank
    cost: number | null;
    description: string | null;
}

export type ScheduledActivity = Activity & { startTime: IsoInstant };

export interface Trip {
    id: number;
    name: string;
    destination: string;
    startDate: IsoInstant; // DATE column, arrives as "2026-10-01T00:00:00.000Z"
    endDate: IsoInstant;   // sameas above
    activities: Activity[]; 
}

export type TripSummary = Omit<Trip,"activities">;

export type ActionErrors = { errors: { message: string }[] };
