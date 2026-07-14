import { MAX_MESSAGE_LENGTH } from "./constants.js";

export function normalizeWhitespace(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

export function normalizeMessage(value = "") {
  return normalizeWhitespace(value).slice(0, MAX_MESSAGE_LENGTH);
}

export function tokenize(value = "") {
  return normalizeWhitespace(value)
    .toLocaleLowerCase("en-SG")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function slugify(value = "") {
  return normalizeWhitespace(value)
    .toLocaleLowerCase("en-SG")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "matter";
}
