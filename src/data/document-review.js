export const documentReviewWorkflow = {
  id: "document-review",
  title: "Document review",
  description: "Review documents consistently without replacing legal judgment.",
  keywords: ["review document", "document review", "discovery", "disclosure", "bundle"],
  prompt: "Create a document review checklist",
  sections: [
    ["Identity", "Document type, author, recipients, date, version and custodian."],
    ["Relevance", "Issue tags, key passage, people and chronology entry."],
    ["Privilege", "Basis, holders, waiver risks and segregation decision."],
    ["Confidentiality", "Sensitivity, personal data and any protective handling."],
    ["Quality control", "Duplicates, family members, redactions and second-level review."]
  ]
};
