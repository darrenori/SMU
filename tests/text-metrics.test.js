import test from "node:test";
import assert from "node:assert/strict";
import { longSentences, readabilityNote, textMetrics } from "../src/core/text-metrics.js";

test("counts document text", () => assert.deepEqual(textMetrics("One sentence.\n\nTwo words."), { characters: 25, charactersWithoutSpaces: 21, words: 4, sentences: 2, paragraphs: 2, readingMinutes: 1 }));
test("finds long sentences", () => assert.equal(longSentences(`${"word ".repeat(36)}.`).length, 1));
test("returns an empty inspection note", () => assert.equal(readabilityNote(""), "Enter text to inspect."));
