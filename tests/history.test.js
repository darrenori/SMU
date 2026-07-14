import test from "node:test";
import assert from "node:assert/strict";
import { appendHistory, createHistory, lastBotMessage } from "../src/core/history.js";

test("filters malformed history", () => assert.equal(createHistory([{ role: "bad", text: "x" }, { role: "bot", text: "ok" }]).length, 1));
test("appends and finds the last bot response", () => {
  const history = appendHistory(appendHistory([], "bot", "first"), "bot", "last");
  assert.equal(lastBotMessage(history), "last");
});
