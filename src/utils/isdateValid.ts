export default function isDateValid(dateString): boolean {
  if (!dateString) return false;

  const now = new Date();
  const d = new Date(dateString);

  if (d > now) return false;

  const [year, month, date] = dateString.split('-').map(Number);
  if (
    d.getFullYear() !== year ||
    d.getMonth() + 1 !== month ||
    d.getDate() !== date
  )
    return false;

  return !isNaN(d.getTime());
}
