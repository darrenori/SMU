import { DISCLAIMER, STORAGE_KEYS } from "../src/core/constants.js";
import { appendHistory, createHistory } from "../src/core/history.js";
import { createReply } from "../src/core/engine.js";
import { createMatter, matterLabel } from "../src/core/matter.js";
import { createStorage } from "../src/core/storage.js";
import { deadlinePlanningNote } from "../src/core/deadlines.js";
import { formatChronology, parseChronology } from "../src/core/chronology.js";
import { chronologyToCsv } from "../src/core/csv.js";
import { readabilityNote } from "../src/core/text-metrics.js";
import { referenceSummary } from "../src/core/references.js";
import { diffLines, diffStats, formatDiff } from "../src/core/line-diff.js";
import { validateDateInput, validateMatter } from "../src/core/validation.js";
import { duplicateLines } from "../src/core/deduplicate.js";
import { createInitialState, reduceState } from "../src/core/state.js";
import { findSensitiveData, redactSensitiveData, sensitiveDataSummary } from "../src/core/redaction.js";
import { downloadText, transcriptFilename, transcriptText } from "../src/core/export.js";
import { checklistProgress, toggleChecklistItem } from "../src/core/checklists.js";
import { searchEntries } from "../src/core/search.js";
import { workflows } from "../src/data/workflows.js";
import { authorities } from "../src/data/authorities.js";
import { glossary } from "../src/data/glossary.js";
import { privacyChecklist } from "../src/data/ethics.js";
import { renderHistory } from "../src/ui/chat.js";
import { applyTheme, cycleTheme, loadTheme } from "../src/ui/theme.js";
import { showToast } from "../src/ui/toast.js";
import { bindShortcuts } from "../src/ui/shortcuts.js";

const $ = (selector) => document.querySelector(selector);
const storage = createStorage();
let history = createHistory(storage.get(STORAGE_KEYS.history, []));
let matter = createMatter(storage.get(STORAGE_KEYS.matter, {}));
let completed = storage.get(STORAGE_KEYS.checklist, []);
let uiState = createInitialState();

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast("Copied to clipboard"), () => showToast("Copy failed", { tone: "warning" }));
}

function saveHistory() {
  storage.set(STORAGE_KEYS.history, history);
  renderHistory($("#messages"), history, { onCopy: copyText });
}

function seedHistory() {
  if (!history.length) {
    history = appendHistory(history, "bot", "Good day. I can structure routine legal work using nine deterministic, offline workflows. Choose a starting point below or type /help.");
    saveHistory();
  } else {
    renderHistory($("#messages"), history, { onCopy: copyText });
  }
}

function clearHistory() {
  history = [];
  storage.remove(STORAGE_KEYS.history);
  seedHistory();
  showToast("Conversation cleared");
}

function sendMessage(value) {
  const text = value.trim();
  if (!text) return;
  history = appendHistory(history, "user", text);
  const response = createReply(text);
  if (typeof response === "object" && response.action === "clear") { clearHistory(); return; }
  history = appendHistory(history, "bot", response);
  saveHistory();
  $("#chat-input").value = "";
  $("#privacy-hint").textContent = "";
}

function renderWorkflowActions() {
  const container = $("#workflow-actions");
  workflows.forEach((workflow) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = workflow.title;
    button.addEventListener("click", () => sendMessage(workflow.prompt));
    container.append(button);
  });
}

function selectTab(name) {
  uiState = reduceState(uiState, { type: "tab/select", tab: name });
  document.querySelectorAll("[role='tab']").forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.tab === name)));
  document.querySelectorAll("[role='tabpanel']").forEach((panel) => { panel.hidden = panel.id !== `panel-${name}`; });
  if (name === "assistant") $("#chat-input").focus();
}

function exportConversation() {
  downloadText(transcriptFilename(matter), transcriptText({ matter, history }));
  showToast("Transcript exported locally");
}

function updateMatterUI() {
  $("#matter-label").textContent = matterLabel(matter);
  $("#matter-name").value = matter.name === "Untitled matter" ? "" : matter.name;
  $("#matter-reference").value = matter.reference;
  $("#matter-client").value = matter.client;
  $("#matter-notes").value = matter.notes;
}

function openMatterDialog() {
  updateMatterUI();
  $("#matter-dialog").showModal();
  $("#matter-name").focus();
}

function renderChecklist() {
  const container = $("#privacy-checklist");
  container.replaceChildren();
  privacyChecklist.forEach((item) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = completed.includes(item.id);
    input.addEventListener("change", () => {
      completed = toggleChecklistItem(completed, item.id);
      storage.set(STORAGE_KEYS.checklist, completed);
      renderChecklist();
    });
    const label = document.createElement("label");
    label.append(input, document.createTextNode(item.label));
    container.append(label);
  });
  const progress = checklistProgress(privacyChecklist, completed);
  $("#checklist-progress").textContent = `${progress.done} of ${progress.total} · ${progress.percent}%`;
}

function renderLibrary() {
  const query = $("#library-search").value;
  const sourceEntries = authorities.map((entry) => ({ ...entry, type: "source" }));
  const glossaryEntries = glossary.map((entry) => ({ title: entry.term, description: entry.definition, tags: [entry.term], type: "term" }));
  const entries = searchEntries(uiState.libraryView === "sources" ? sourceEntries : glossaryEntries, query);
  const container = $("#library-results");
  container.replaceChildren();
  if (!entries.length) { container.innerHTML = '<p class="empty-state">No matching entries. Try a broader term.</p>'; return; }
  entries.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "library-card";
    const title = document.createElement("h2");
    title.textContent = entry.title;
    const description = document.createElement("p");
    description.textContent = entry.description;
    card.append(title, description);
    if (entry.url) {
      const link = document.createElement("a");
      link.href = entry.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = "Open official source ↗";
      card.append(link);
    }
    container.append(card);
  });
}

applyTheme(loadTheme(storage));
seedHistory();
renderWorkflowActions();
renderChecklist();
renderLibrary();
updateMatterUI();
$("#deadline-start").valueAsDate = new Date();

document.querySelectorAll("[role='tab']").forEach((tab) => tab.addEventListener("click", () => selectTab(tab.dataset.tab)));
$("#chat-form").addEventListener("submit", (event) => { event.preventDefault(); sendMessage($("#chat-input").value); });
$("#chat-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(event.currentTarget.value); }
});
$("#chat-input").addEventListener("input", (event) => {
  const findings = findSensitiveData(event.currentTarget.value);
  $("#privacy-hint").textContent = findings.length ? `Privacy check: ${[...new Set(findings.map(({ type }) => type))].join(", ")} detected.` : "";
  event.currentTarget.style.height = "auto";
  event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 82)}px`;
});
$("#clear-button").addEventListener("click", clearHistory);
$("#export-button").addEventListener("click", exportConversation);
$("#theme-button").addEventListener("click", () => showToast(`Theme: ${cycleTheme(storage)}`));
$("#matter-button").addEventListener("click", openMatterDialog);
$("#matter-label").addEventListener("click", openMatterDialog);
$("#matter-close").addEventListener("click", () => $("#matter-dialog").close());
$("#matter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const inputMatter = { name: $("#matter-name").value, reference: $("#matter-reference").value, client: $("#matter-client").value, notes: $("#matter-notes").value };
  const validation = validateMatter(inputMatter);
  if (!validation.valid) { showToast(Object.values(validation.errors)[0], { tone: "warning" }); return; }
  matter = createMatter(inputMatter);
  storage.set(STORAGE_KEYS.matter, matter);
  updateMatterUI();
  $("#matter-dialog").close();
  showToast("Matter saved locally");
});
$("#matter-delete").addEventListener("click", () => {
  matter = createMatter();
  storage.remove(STORAGE_KEYS.matter);
  updateMatterUI();
  $("#matter-dialog").close();
  showToast("Local matter deleted");
});
$("#deadline-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = { start: $("#deadline-start").value, days: $("#deadline-days").value };
  const validation = validateDateInput(input);
  if (!validation.valid) { $("#deadline-result").textContent = Object.values(validation.errors).join(" "); return; }
  try { $("#deadline-result").textContent = deadlinePlanningNote({ ...validation.value, weekdays: $("#deadline-weekdays").checked }); }
  catch (error) { $("#deadline-result").textContent = error.message; }
});
$("#chronology-sort").addEventListener("click", () => {
  const parsed = parseChronology($("#chronology-input").value);
  if (parsed.errors.length) { $("#chronology-result").textContent = parsed.errors.map(({ lineNumber, reason }) => `Line ${lineNumber}: ${reason}`).join("\n"); return; }
  const formatted = formatChronology(parsed.entries);
  $("#chronology-input").value = formatted;
  $("#chronology-result").textContent = `${parsed.entries.length} event${parsed.entries.length === 1 ? "" : "s"} sorted chronologically.`;
});
$("#chronology-export").addEventListener("click", () => {
  const parsed = parseChronology($("#chronology-input").value);
  if (!parsed.entries.length || parsed.errors.length) { showToast("Fix chronology rows before export", { tone: "warning" }); return; }
  downloadText("ikebot-chronology.csv", chronologyToCsv(parsed.entries));
  showToast("Chronology exported locally");
});
$("#text-inspector-run").addEventListener("click", () => {
  const text = $("#text-inspector-input").value;
  const references = referenceSummary(text);
  const duplicates = duplicateLines(text).length;
  $("#text-inspector-result").textContent = `${readabilityNote(text)}\n${references.citations} neutral citation${references.citations === 1 ? "" : "s"} · ${references.sections} section reference${references.sections === 1 ? "" : "s"} · ${duplicates} repeated line${duplicates === 1 ? "" : "s"}`;
});
$("#diff-run").addEventListener("click", () => {
  const changes = diffLines($("#diff-before").value, $("#diff-after").value);
  const stats = diffStats(changes);
  $("#diff-result").textContent = `${stats.added} added · ${stats.removed} removed · ${stats.same} unchanged\n\n${formatDiff(changes)}`;
});
$("#scan-button").addEventListener("click", () => { $("#privacy-result").textContent = sensitiveDataSummary($("#privacy-input").value); });
$("#redact-button").addEventListener("click", () => {
  $("#privacy-input").value = redactSensitiveData($("#privacy-input").value);
  $("#privacy-result").textContent = "Common identifiers replaced locally. Review the result before use.";
});
$("#library-search").addEventListener("input", renderLibrary);
document.querySelectorAll("[data-library]").forEach((button) => button.addEventListener("click", () => {
  uiState = reduceState(uiState, { type: "library/view", view: button.dataset.library });
  document.querySelectorAll("[data-library]").forEach((item) => item.classList.toggle("active", item === button));
  renderLibrary();
}));

bindShortcuts({
  input: $("#chat-input"),
  onExport: exportConversation,
  onClear: clearHistory,
  onTools: () => selectTab("tools"),
  onLibrary: () => selectTab("library")
});

console.info(`IKEBOT ready. ${DISCLAIMER}`);
