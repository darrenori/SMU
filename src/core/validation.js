export function validateMatter(matter = {}) {
  const errors = {};
  if (!String(matter.name || "").trim()) errors.name = "Enter a matter name.";
  if (String(matter.name || "").length > 80) errors.name = "Matter name must be 80 characters or fewer.";
  if (String(matter.reference || "").length > 40) errors.reference = "Reference must be 40 characters or fewer.";
  if (String(matter.notes || "").length > 2000) errors.notes = "Notes must be 2,000 characters or fewer.";
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateDateInput({ start, days }) {
  const errors = {};
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(start))) errors.start = "Choose a start date.";
  const count = Number(days);
  if (!Number.isInteger(count) || Math.abs(count) > 3650) errors.days = "Days must be a whole number between -3650 and 3650.";
  return { valid: Object.keys(errors).length === 0, errors, value: { start, days: count } };
}
