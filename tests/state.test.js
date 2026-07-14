import test from "node:test";
import assert from "node:assert/strict";
import { createInitialState, reduceState } from "../src/core/state.js";

test("changes active tabs immutably", () => {
  const state = createInitialState();
  const next = reduceState(state, { type: "tab/select", tab: "tools" });
  assert.equal(next.activeTab, "tools");
  assert.notEqual(next, state);
});
test("ignores unknown actions", () => { const state = createInitialState(); assert.equal(reduceState(state, { type: "unknown" }), state); });
