export default function findWeekStartDate(date: Date) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() - d.getUTCDay()); // Sets start of week date to Sunday
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
}
