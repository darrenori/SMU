export const intakeWorkflow = {
  id: "intake",
  title: "Client intake",
  description: "Structure an initial client conversation before substantive advice.",
  keywords: ["intake", "new client", "first meeting", "interview", "onboard"],
  prompt: "Prepare a client intake checklist",
  sections: [
    ["Parties", "Full names, roles, contact details and all potentially adverse parties."],
    ["Chronology", "Key events, dates, locations and who was present."],
    ["Documents", "Agreements, correspondence, notices, invoices and prior advice."],
    ["Objective", "Desired outcome, urgency, commercial constraints and alternatives."],
    ["Risk controls", "Conflict check, limitation triage, confidentiality and authority to instruct."]
  ]
};
