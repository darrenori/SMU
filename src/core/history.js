import { MAX_HISTORY_ITEMS } from "./constants.js";

export function createHistory(items = []) {
  return items.filter(isHistoryItem).slice(-MAX_HISTORY_ITEMS);
}

export function isHistoryItem(item) {
  return item && ["user", "bot", "system"].includes(item.role) && typeof item.text === "string";
}

export function appendHistory(items, role, text) {
  return createHistory([...items, { id: crypto.randomUUID(), role, text: String(text), at: new Date().toISOString() }]);
}

export function lastBotMessage(items = []) {
  return [...items].reverse().find(({ role }) => role === "bot")?.text || "";
}
