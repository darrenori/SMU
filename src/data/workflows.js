import { intakeWorkflow } from "./intake.js";
import { researchWorkflow } from "./research.js";
import { clauseWorkflow } from "./clauses.js";
import { deadlineWorkflow } from "./deadline-workflow.js";
import { chronologyWorkflow } from "./chronology.js";
import { caseBriefWorkflow } from "./case-brief.js";
import { documentReviewWorkflow } from "./document-review.js";
import { correspondenceWorkflow } from "./correspondence.js";
import { hearingWorkflow } from "./hearing.js";

export const workflows = [
  intakeWorkflow,
  researchWorkflow,
  clauseWorkflow,
  deadlineWorkflow,
  chronologyWorkflow,
  caseBriefWorkflow,
  documentReviewWorkflow,
  correspondenceWorkflow,
  hearingWorkflow
];

export function workflowById(id) {
  return workflows.find((workflow) => workflow.id === id);
}
