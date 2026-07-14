export function citationChecklist(reference = "") {
  const label = reference.trim() || "the authority";
  return [
    `Confirm the full neutral citation or legislation identifier for ${label}.`,
    "Open the primary source and confirm the quoted proposition in context.",
    "Check court level, jurisdiction, commencement date and version in force.",
    "Review subsequent treatment, appeals and amendments.",
    "Record the pinpoint paragraph, section or regulation and access date."
  ];
}

export function formatChecklist(items = []) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}
