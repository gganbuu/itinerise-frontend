export function getStartMinutes(startTime) {
    const newDate = new Date(startTime)
    return newDate.getHours() * 60 + newDate.getMinutes()
}