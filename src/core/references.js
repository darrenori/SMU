const NEUTRAL_CITATION = /\[(\d{4})\]\s+SG(?:CA|HC|HC\(A\)|DC|MC|FC|SCT|IPOS|PDPC)\s+\d+/g;
const SECTION_REFERENCE = /\b(?:s|ss|section|sections)\.?\s+\d+[A-Za-z]?(?:\([^)]+\))*/gi;

export function extractReferences(value = "") {
  const text = String(value);
  const citations = [...text.matchAll(NEUTRAL_CITATION)].map((match) => ({ type: "citation", value: match[0], year: Number(match[1]), index: match.index }));
  const sections = [...text.matchAll(SECTION_REFERENCE)].map((match) => ({ type: "section", value: match[0], index: match.index }));
  return [...citations, ...sections].sort((a, b) => a.index - b.index);
}

export function uniqueReferences(value = "") {
  const seen = new Set();
  return extractReferences(value).filter(({ type, value: reference }) => {
    const key = `${type}:${reference.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function referenceSummary(value = "") {
  const references = uniqueReferences(value);
  const citations = references.filter(({ type }) => type === "citation").length;
  const sections = references.filter(({ type }) => type === "section").length;
  return { total: references.length, citations, sections, references };
}
