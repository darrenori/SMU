import test from "node:test";
import assert from "node:assert/strict";
import { transcriptFilename, transcriptText } from "../src/core/export.js";

test("exports a labelled transcript", () => {
  const output = transcriptText({ matter: { name: "Review" }, history: [{ role: "bot", text: "Hello" }], generatedAt: new Date("2026-07-14T12:00:00Z") });
  assert.match(output, /Matter: Review/);
  assert.match(output, /\[BOT\]\nHello/);
  assert.match(output, /Planning assistance only/);
});
test("creates a safe export filename", () => assert.match(transcriptFilename({ name: "ACME / Review" }), /^ikebot-acme-review-/));
