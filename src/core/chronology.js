const DATE_PATTERN = /^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}:\d{2}))?\s*[|\t]\s*(.+?)(?:\s*[|\t]\s*(.+))?$/;

export function parseChronology(text = "") {
  const errors = [];
  const entries = String(text).split(/\r?\n/).map((line, index) => ({ line: line.trim(), lineNumber: index + 1 })).filter(({ line }) => line);
  const parsed = entries.flatMap(({ line, lineNumber }) => {
    const match = line.match(DATE_PATTERN);
    if (!match) { errors.push({ lineNumber, line, reason: "Use YYYY-MM-DD | event | source" }); return []; }
    const [, date, time = "", event, source = ""] = match;
    const timestamp = Date.parse(`${date}T${time || "00:00"}:00+08:00`);
    if (Number.isNaN(timestamp)) { errors.push({ lineNumber, line, reason: "Invalid date or time" }); return []; }
    return [{ id: `${date}-${lineNumber}`, date, time, event: event.trim(), source: source.trim(), timestamp, lineNumber }];
  });
  return { entries: parsed, errors };
}

export function sortChronology(entries = []) {
  return [...entries].sort((a, b) => a.timestamp - b.timestamp || a.lineNumber - b.lineNumber);
}

export function formatChronology(entries = []) {
  return sortChronology(entries).map(({ date, time, event, source }) => `${date}${time ? ` ${time}` : ""} | ${event}${source ? ` | ${source}` : ""}`).join("\n");
}

export function chronologySummary(entries = []) {
  const sorted = sortChronology(entries);
  return { count: sorted.length, first: sorted[0]?.date || null, last: sorted.at(-1)?.date || null, sources: new Set(sorted.map(({ source }) => source).filter(Boolean)).size };
}
