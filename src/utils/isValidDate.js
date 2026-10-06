export function isValidDate(dateStr) {
  // 1. Check the basic pattern format (YY/MM/DD)
  const regex = /^\d{2}\/\d{2}\/\d{2}$/;
  if (!regex.test(dateStr)) return false;

  // 2. Parse out the segments
  const [yy, mm, dd] = dateStr.split('/').map(Number);

  // 3. Create a date object (Assuming 2000s for the 2-digit year)
  const fullYear = 2000 + yy;
  const dateObj = new Date(fullYear, mm - 1, dd);

  // 4. Verify the date didn't roll over (e.g., Feb 30 becoming March 2)
  return (
    dateObj.getFullYear() === fullYear &&
    dateObj.getMonth() === mm - 1 &&
    dateObj.getDate() === dd
  );
}