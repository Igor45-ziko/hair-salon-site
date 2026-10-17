export function todayInMoscow() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function nextDay(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function nightCount(arrival: string, departure: string) {
  const difference =
    Date.parse(`${departure}T12:00:00Z`) - Date.parse(`${arrival}T12:00:00Z`);
  return Number.isFinite(difference) && difference > 0
    ? Math.round(difference / 86_400_000)
    : 0;
}
