const DETECTORS = [
  { type: "email address", pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, replacement: "[EMAIL]" },
  { type: "Singapore NRIC/FIN", pattern: /\b[STFGM]\d{7}[A-Z]\b/gi, replacement: "[IDENTIFIER]" },
  { type: "phone number", pattern: /(?<!\d)(?:\+?65[ -]?)?[689]\d{3}[ -]?\d{4}(?!\d)/g, replacement: "[PHONE]" },
  { type: "credit card-like number", pattern: /\b(?:\d[ -]*?){13,19}\b/g, replacement: "[NUMBER]" }
];

export function findSensitiveData(value = "") {
  return DETECTORS.flatMap(({ type, pattern }) => {
    pattern.lastIndex = 0;
    return [...String(value).matchAll(pattern)].map((match) => ({ type, value: match[0], index: match.index }));
  }).sort((a, b) => a.index - b.index);
}

export function redactSensitiveData(value = "") {
  return DETECTORS.reduce((text, { pattern, replacement }) => text.replace(pattern, replacement), String(value));
}

export function sensitiveDataSummary(value = "") {
  const types = [...new Set(findSensitiveData(value).map(({ type }) => type))];
  return types.length ? `Possible ${types.join(", ")} detected.` : "No common personal identifiers detected.";
}
