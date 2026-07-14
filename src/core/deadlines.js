const SG_TIME_ZONE = "Asia/Singapore";

function asDate(value) {
  const date = value instanceof Date ? new Date(value) : new Date(`${value}T00:00:00+08:00`);
  if (Number.isNaN(date.getTime())) throw new TypeError("Enter a valid date.");
  return date;
}

export function addCalendarDays(start, days) {
  const result = asDate(start);
  result.setDate(result.getDate() + Number(days));
  return result;
}

export function addWeekdays(start, days) {
  const result = asDate(start);
  const direction = Number(days) < 0 ? -1 : 1;
  let remaining = Math.abs(Number(days));
  while (remaining > 0) {
    result.setDate(result.getDate() + direction);
    const weekday = result.getDay();
    if (weekday !== 0 && weekday !== 6) remaining -= 1;
  }
  return result;
}

export function formatSingaporeDate(value) {
  return new Intl.DateTimeFormat("en-SG", {
    timeZone: SG_TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long"
  }).format(asDate(value));
}

export function deadlinePlanningNote({ start, days, weekdays = false }) {
  const result = weekdays ? addWeekdays(start, days) : addCalendarDays(start, days);
  const method = weekdays ? "weekdays only (public holidays not excluded)" : "calendar days";
  return `Planning date: ${formatSingaporeDate(result)}\nMethod: ${days} ${method} from the selected start date.\n\nConfirm the triggering event, whether the first or last day is included, court closures, public holidays, service rules and any applicable extension.`;
}
