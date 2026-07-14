const messages = document.querySelector("#messages");
const actions = document.querySelector("#actions");
const form = document.querySelector("#form");
const input = document.querySelector("#input");

const replies = [
  [/intake|client|interview/i, "Start with:\n1. Parties and contact details\n2. Key dates and chronology\n3. Available documents\n4. Desired outcome and urgency\n5. Conflicts and limitation checks\n\nKeep facts separate from assumptions."],
  [/research|case|law|authority/i, "Suggested path:\n1. Frame the precise issue\n2. Identify governing Singapore legislation\n3. Find current binding authorities\n4. Check subsequent treatment and commencement dates\n5. Record citations and open questions\n\nVerify the result in LawNet or another authoritative source."],
  [/clause|plain|explain|contract/i, "Remove confidential details, then review the clause under four headings: what it requires, who bears the risk, when it applies, and what follows a breach."],
  [/deadline|limitation|date/i, "Capture the triggering event, governing provision, possible exclusions or extensions, and calculation method. Have counsel verify the final date against the current authoritative text."]
];

function addMessage(text, role) {
  const item = document.createElement("div");
  item.className = `message ${role}`;
  if (role === "bot") {
    const label = document.createElement("span");
    label.textContent = "IKEBOT";
    item.append(label);
  }
  const body = document.createElement("p");
  body.textContent = text;
  item.append(body);
  messages.append(item);
  messages.scrollTop = messages.scrollHeight;
}

function replyFor(prompt) {
  return replies.find(([pattern]) => pattern.test(prompt))?.[1] ?? "Tell me whether you need a client-intake checklist, a legal-research plan, a plain-language clause explanation, or a deadline-checking framework.";
}

function send(prompt) {
  const value = prompt.trim();
  if (!value) return;
  actions?.remove();
  addMessage(value, "user");
  input.value = "";
  window.setTimeout(() => addMessage(replyFor(value), "bot"), 250);
}

form.addEventListener("submit", (event) => { event.preventDefault(); send(input.value); });
actions?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-prompt]");
  if (button) send(button.dataset.prompt);
});
document.querySelector("#reset").addEventListener("click", () => window.location.reload());
