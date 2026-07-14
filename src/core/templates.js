const PLACEHOLDER = /\{\{\s*([a-zA-Z][\w.-]*)\s*\}\}/g;

function getPath(input, path) {
  return path.split(".").reduce((value, key) => value?.[key], input);
}

export function templateFields(template = "") {
  return [...new Set([...String(template).matchAll(PLACEHOLDER)].map((match) => match[1]))];
}

export function renderTemplate(template = "", values = {}, { keepMissing = true } = {}) {
  return String(template).replace(PLACEHOLDER, (original, path) => {
    const value = getPath(values, path);
    return value === undefined || value === null || value === "" ? (keepMissing ? original : "") : String(value);
  });
}

export function missingTemplateFields(template = "", values = {}) {
  return templateFields(template).filter((path) => {
    const value = getPath(values, path);
    return value === undefined || value === null || value === "";
  });
}
