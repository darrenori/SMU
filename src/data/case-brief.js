export const caseBriefWorkflow = {
  id: "case-brief",
  title: "Case brief",
  description: "Capture a decision in a consistent, reviewable format.",
  keywords: ["brief case", "case brief", "summarise judgment", "judgment", "decision"],
  prompt: "Give me a case brief template",
  sections: [
    ["Citation", "Court, coram, date, neutral citation and procedural posture."],
    ["Material facts", "Facts necessary to understand the issues and result."],
    ["Issues", "Questions the court actually determined."],
    ["Holding and reasons", "Outcome, governing rule and decisive reasoning with pinpoints."],
    ["Treatment", "Orders, dissents, appeal status and later judicial consideration."]
  ]
};
