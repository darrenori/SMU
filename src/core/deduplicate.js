import { normalizeWhitespace } from "./normalize.js";

export function duplicateLines(value = "", { caseSensitive = false } = {}) {
  const groups = new Map();
  String(value).split(/\r?\n/).forEach((line, index) => {
    const display = normalizeWhitespace(line);
    if (!display) return;
    const key = caseSensitive ? display : display.toLocaleLowerCase("en-SG");
    const current = groups.get(key) || { text: display, lines: [] };
    current.lines.push(index + 1);
    groups.set(key, current);
  });
  return [...groups.values()].filter(({ lines }) => lines.length > 1).sort((a, b) => b.lines.length - a.lines.length || a.lines[0] - b.lines[0]);
}

export function removeDuplicateLines(value = "", options = {}) {
  const seen = new Set();
  return String(value).split(/\r?\n/).filter((line) => {
    const normalized = normalizeWhitespace(line);
    if (!normalized) return true;
    const key = options.caseSensitive ? normalized : normalized.toLocaleLowerCase("en-SG");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).join("\n");
}
