import { tokenize } from "./normalize.js";

export function searchEntries(entries = [], query = "") {
  const terms = tokenize(query);
  if (!terms.length) return entries;
  return entries
    .map((entry) => {
      const haystack = tokenize([entry.title, entry.description, ...(entry.tags || [])].join(" "));
      const score = terms.reduce((total, term) => total + haystack.filter((token) => token.includes(term)).length, 0);
      return { ...entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}
