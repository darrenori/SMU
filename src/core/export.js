import { APP_NAME, APP_VERSION, DISCLAIMER } from "./constants.js";
import { matterLabel } from "./matter.js";
import { slugify } from "./normalize.js";
import { renderTemplate } from "./templates.js";

export function transcriptText({ matter = {}, history = [], generatedAt = new Date() } = {}) {
  const heading = renderTemplate("{{app}}\nMatter: {{matter}}\nExported: {{exported}}", {
    app: APP_NAME,
    matter: matterLabel(matter),
    exported: generatedAt.toLocaleString("en-SG", { timeZone: "Asia/Singapore" })
  });
  const lines = [
    heading,
    "",
    ...history.flatMap((item) => [`[${item.role.toUpperCase()}]`, item.text, ""]),
    "---",
    DISCLAIMER,
    `Generated locally by ${APP_NAME} ${APP_VERSION}.`
  ];
  return lines.join("\n");
}

export function transcriptFilename(matter = {}) {
  return `ikebot-${slugify(matterLabel(matter))}-${new Date().toISOString().slice(0, 10)}.txt`;
}

export function downloadText(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
