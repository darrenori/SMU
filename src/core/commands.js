const COMMANDS = Object.freeze({
  "/help": "Show available commands",
  "/intake": "Open the client intake workflow",
  "/research": "Create a legal research plan",
  "/deadline": "Open the planning-date calculator",
  "/authorities": "Show authoritative Singapore sources",
  "/privacy": "Explain local data handling",
  "/clear": "Clear the current conversation"
});

export function commandList() {
  return Object.entries(COMMANDS).map(([command, description]) => `${command} — ${description}`).join("\n");
}

export function parseCommand(value = "") {
  const [name, ...args] = value.trim().split(/\s+/);
  if (!name.startsWith("/")) return null;
  return { name: name.toLowerCase(), args, known: Object.hasOwn(COMMANDS, name.toLowerCase()) };
}
