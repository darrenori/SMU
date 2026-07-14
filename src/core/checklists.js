export function checklistProgress(items = [], completed = []) {
  const selected = new Set(completed);
  const done = items.filter(({ id }) => selected.has(id)).length;
  return { done, total: items.length, percent: items.length ? Math.round((done / items.length) * 100) : 0 };
}

export function toggleChecklistItem(completed = [], id) {
  const next = new Set(completed);
  next.has(id) ? next.delete(id) : next.add(id);
  return [...next];
}
