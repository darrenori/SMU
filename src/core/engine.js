import { commandList, parseCommand } from "./commands.js";
import { normalizeMessage, tokenize } from "./normalize.js";
import { sensitiveDataSummary } from "./redaction.js";
import { authorities } from "../data/authorities.js";
import { workflows, workflowById } from "../data/workflows.js";

function scoreWorkflow(workflow, text) {
  const haystack = normalizeMessage(text).toLowerCase();
  const words = new Set(tokenize(text));
  return workflow.keywords.reduce((score, keyword) => {
    const phrase = keyword.toLowerCase();
    return score + (haystack.includes(phrase) ? phrase.split(" ").length * 3 : words.has(phrase) ? 1 : 0);
  }, 0);
}

export function formatWorkflow(workflow) {
  return `${workflow.title}\n\n${workflow.sections.map(([heading, detail], index) => `${index + 1}. ${heading}\n${detail}`).join("\n\n")}\n\nUse this as a preparation framework and verify the matter-specific legal position.`;
}

function commandReply(command) {
  if (!command.known || command.name === "/help") return `Available commands\n\n${commandList()}`;
  if (command.name === "/privacy") return "IKEBOT works locally in your browser. This prototype sends no messages, matter names or usage data to a server. Use the privacy scan before saving or exporting content.";
  if (command.name === "/authorities") return `Authoritative starting points\n\n${authorities.map(({ title, url }) => `• ${title}\n  ${url}`).join("\n")}`;
  if (command.name === "/clear") return { action: "clear" };
  const workflow = workflowById(command.name.slice(1));
  return workflow ? formatWorkflow(workflow) : `Available commands\n\n${commandList()}`;
}

export function createReply(input = "") {
  const text = normalizeMessage(input);
  if (!text) return "Choose a workflow or describe the task you need to structure.";
  const command = parseCommand(text);
  if (command) return commandReply(command);
  if (/privacy|confidential|personal data|nric|email address/i.test(text)) return `Privacy scan\n\n${sensitiveDataSummary(text)} IKEBOT processes this text locally. Remove unnecessary matter details before saving or exporting.`;
  const ranked = workflows.map((workflow) => ({ workflow, score: scoreWorkflow(workflow, text) })).sort((a, b) => b.score - a.score);
  if (ranked[0]?.score > 0) return formatWorkflow(ranked[0].workflow);
  return `I can structure this using one of nine offline workflows:\n\n${workflows.map(({ title }) => `• ${title}`).join("\n")}\n\nTry a task name or type /help.`;
}
