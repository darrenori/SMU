import { normalizeWhitespace } from "./normalize.js";

export function textMetrics(value = "") {
  const text = String(value);
  const words = normalizeWhitespace(text) ? normalizeWhitespace(text).split(" ") : [];
  const sentences = text.split(/[.!?]+(?:\s|$)/).map((item) => item.trim()).filter(Boolean);
  const paragraphs = text.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
  const readingMinutes = words.length ? Math.max(1, Math.ceil(words.length / 220)) : 0;
  return { characters: text.length, charactersWithoutSpaces: text.replace(/\s/g, "").length, words: words.length, sentences: sentences.length, paragraphs: paragraphs.length, readingMinutes };
}

export function longSentences(value = "", limit = 35) {
  return String(value).split(/(?<=[.!?])\s+/).map((text, index) => ({ index, text: text.trim(), words: text.trim().split(/\s+/).filter(Boolean).length })).filter(({ text, words }) => text && words > limit);
}

export function readabilityNote(value = "") {
  const metrics = textMetrics(value);
  const long = longSentences(value);
  if (!metrics.words) return "Enter text to inspect.";
  return `${metrics.words} words · ${metrics.sentences} sentences · ${metrics.readingMinutes} min read${long.length ? ` · ${long.length} sentence${long.length === 1 ? "" : "s"} over 35 words` : ""}`;
}
