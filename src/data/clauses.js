export const clauseWorkflow = {
  id: "clause",
  title: "Clause explainer",
  description: "Create a lawyer-reviewed plain-language explanation framework.",
  keywords: ["clause", "contract", "plain language", "agreement", "provision"],
  prompt: "Explain a clause in plain language",
  sections: [
    ["Obligation", "What must, may or must not happen?"],
    ["Actor", "Which party performs, decides, pays or bears the risk?"],
    ["Trigger", "What event, notice, threshold or date makes it apply?"],
    ["Consequence", "What remedy, termination right, payment or liability follows?"],
    ["Questions", "Which defined terms, cross-references, carve-outs or schedules change the answer?"]
  ]
};
