import { createReply } from "./src/core/engine.js";
import { findSensitiveData } from "./src/core/redaction.js";

const messages = document.querySelector("#messages");
const form = document.querySelector("#chat-form");
const input = document.querySelector("#chat-input");
const quickActions = document.querySelector("#quick-actions");

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

function submitPrompt(prompt) {
  const value = prompt.trim();
  if (!value) return;
  quickActions?.remove();
  addMessage(value, "user");
  input.value = "";
  const warning = findSensitiveData(value).length ? "\n\nPrivacy note: remove unnecessary personal identifiers before using matter content." : "";
  window.setTimeout(() => addMessage(`${createReply(value)}${warning}`, "bot"), 220);
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
