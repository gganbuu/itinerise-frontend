// parses 'yyyy-mm-dd' as local midnight (new Date('yyyy-mm-dd') would parse as UTC)
export const toLocalDate = (date: string | Date) => {
    if (date instanceof Date) return new Date(date);
    const [y, m, d] = date.slice(0,10).split("-").map(Number);
    return new Date(y, m - 1, d);
}