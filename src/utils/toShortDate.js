export function toShortDate(date) {
    return date.toLocaleDateString('ja-JP', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit'
                        });
}