function escapeCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function rowsToCsv(rows = [], columns = []) {
  const definitions = columns.length ? columns : Object.keys(rows[0] || {}).map((key) => ({ key, label: key }));
  const header = definitions.map(({ label, key }) => escapeCell(label || key)).join(",");
  const body = rows.map((row) => definitions.map(({ key }) => escapeCell(row[key])).join(","));
  return [header, ...body].join("\r\n");
}

export function chronologyToCsv(entries = []) {
  return rowsToCsv(entries, [
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
    { key: "event", label: "Event" },
    { key: "source", label: "Source" }
  ]);
}
