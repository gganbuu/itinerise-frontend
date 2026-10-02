// parses 'yyyy-mm-dd' as local midnight (new Date('yyyy-mm-dd') would parse as UTC)
const toLocalDate = (date) => {
    if (date instanceof Date) return new Date(date);
    const [y, m, d] = date.slice(0,10).split("-").map(Number);
    return new Date(y, m - 1, d);
}

// function takes in trip data, returns days array
export default function getDaysFromTrip(startDate, endDate) {
    const days = [];
    const currentDate = toLocalDate(startDate);
    const lastDate = toLocalDate(endDate);
    while (currentDate <= lastDate) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return days
}
