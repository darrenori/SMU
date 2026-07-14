const messages = document.querySelector("#messages");
const form = document.querySelector("#chat-form");
const input = document.querySelector("#chat-input");
const quickActions = document.querySelector("#quick-actions");

const responses = [
  {
    match: /intake|client|interview/i,
    text: "Start with these five points:\n1. Parties and contact details\n2. Key dates and chronology\n3. Documents already available\n4. Desired outcome and urgency\n5. Conflicts and limitation checks\n\nRecord facts separately from the client's assumptions."
  },
  {
    match: /research|case|law|authority/i,
    text: "A useful research path is:\n1. Frame the precise legal issue\n2. Identify the governing Singapore legislation\n3. Find current binding authorities\n4. Check subsequent treatment and commencement dates\n5. Record citations and open questions\n\nUse LawNet or another authoritative source for the final check."
  },
  {
    match: /clause|plain|explain|contract/i,
    text: "Paste the clause and I can help structure a plain-language explanation around: what it requires, who bears the risk, when it applies, and what happens after a breach. Remove confidential details first."
  },
  {
    match: /deadline|limitation|date/i,
    text: "Treat every deadline as matter-specific. Capture the triggering event, governing provision, possible exclusions or extensions, and calculation method—then have counsel verify the date against the current authoritative text."
  }
];

function addMessage(text, role) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;
  if (role === "bot") {
    const label = document.createElement("span");
    label.className = "message-label";
    label.textContent = "IKEBOT";
    wrapper.append(label);
  }
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  wrapper.append(paragraph);
  messages.append(wrapper);
  messages.scrollTop = messages.scrollHeight;
}

function answer(prompt) {
  const result = responses.find(({ match }) => match.test(prompt));
  return result?.text ?? "I can help structure that. Tell me whether you need a client-intake checklist, a legal-research plan, a plain-language clause explanation, or a deadline-checking framework.";
}

function submitPrompt(prompt) {
  const value = prompt.trim();
  if (!value) return;
  quickActions?.remove();
  addMessage(value, "user");
  input.value = "";
  window.setTimeout(() => addMessage(answer(value), "bot"), 350);
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  submitPrompt(input.value);
});

quickActions?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-prompt]");
  if (button) submitPrompt(button.dataset.prompt);
});

document.querySelector("#year").textContent = new Date().getFullYear();
