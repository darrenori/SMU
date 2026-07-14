export const chronologyWorkflow = {
  id: "chronology",
  title: "Matter chronology",
  description: "Build a source-linked chronology from matter documents.",
  keywords: ["chronology", "timeline", "sequence", "events", "dates"],
  prompt: "Help me build a matter chronology",
  sections: [
    ["Date and time", "Use the most precise supported date; mark estimates clearly."],
    ["Event", "Describe one neutral event per row without argument."],
    ["People", "Record each participant and their role."],
    ["Source", "Link the document, page, email or witness supporting the entry."],
    ["Significance", "Note the issue affected and any factual conflict requiring follow-up."]
  ]
};
