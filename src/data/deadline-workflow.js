export const deadlineWorkflow = {
  id: "deadline",
  title: "Deadline triage",
  description: "Collect the inputs a lawyer needs before calculating a legal deadline.",
  keywords: ["deadline", "limitation", "due date", "time limit", "filing date", "service"],
  prompt: "Help me check a legal deadline",
  sections: [
    ["Trigger", "Identify the exact event and evidence of when it occurred."],
    ["Rule", "Record the governing provision, order, direction or contractual term."],
    ["Method", "Confirm inclusion rules, calendar versus working days and time of day."],
    ["Adjustments", "Check public holidays, court closures, service method and extensions."],
    ["Verification", "Have the responsible lawyer independently diary and verify the date."]
  ]
};
